package com.balintova.repositoryOfRecipe.services;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.models.*;
import com.balintova.repositoryOfRecipe.queries.RecipeQueries;
import com.balintova.repositoryOfRecipe.queries.WikidataQueries;
import org.apache.jena.arq.querybuilder.AskBuilder;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.arq.querybuilder.UpdateBuilder;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFactory;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.system.Txn;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeService {

    static String wikiClassVar = Constant.wikiClassVar;

    private ResultSet transactionWithReturningResultSet(SelectBuilder builder){
        ResultSet safeCopy =
                Txn.calculateRead(Fuseki.getConnectionRecipes(), ()-> {
                    QueryExecution execution = Fuseki.getConnectionRecipes().query(builder.build());
                    ResultSet result = ResultSetFactory.copyResults(execution.execSelect());
                    execution.close();
                    return  result;
                }) ;
        return safeCopy;
    }

    public List<Recipe> findAll(){
        SelectBuilder builder = RecipeQueries.getAllRecipeQuery();
        ResultSet safeCopy = transactionWithReturningResultSet(builder);
        List<Recipe> recipes = Recipe.createListOfBasicRecipesFromResultSet(safeCopy);
        return recipes;
    }

    public List<Recipe> findByName(String name){
        SelectBuilder builder = RecipeQueries.findByNameQuery(name);
        ResultSet safeCopy = transactionWithReturningResultSet(builder);
        List<Recipe> recipes = Recipe.createListOfBasicRecipesFromResultSet(safeCopy);
        return recipes;
    }

    public List<Recipe> findByAuthor(String username){
        SelectBuilder builder = RecipeQueries.findByAuthor(username);
        ResultSet safeCopy = transactionWithReturningResultSet(builder);
        List<Recipe> recipes = Recipe.createListOfBasicRecipesFromResultSet(safeCopy);
        return recipes;
    }

    public List<Recipe> findSimilarRecipes(String id){
        SelectBuilder builder = RecipeQueries.findSimilarRecipes(id);
        ResultSet safeCopy = transactionWithReturningResultSet(builder);
        List<Recipe> recipes = Recipe.createListOfBasicRecipesFromResultSet(safeCopy);
        return recipes;
    }

    public List<Recipe> findByFilterFromUser(List<String> inA, List<String> exA, List<String> inCa, List<String> exCa,
                                             List<String> inCM, List<String> exCM, List<String> inCu, List<String> exCu,
                                             List<String> inK, List<String> exK, List<String> inI, List<String> exI,
                                             String minTime, String maxTime, boolean Aall, boolean CAall, boolean CMall,
                                             boolean CUall,boolean Kall, boolean Iall){

        SelectBuilder builder = RecipeQueries.findByFilterFromUser(inA, exA, inCa, exCa, inCM, exCM, inCu, exCu, inK, exK, inI, exI, minTime, maxTime,
                                                                    Aall, CAall, CMall, CUall, Kall, Iall);
        ResultSet safeCopy = transactionWithReturningResultSet(builder);
        List<Recipe> recipes = Recipe.createListOfBasicRecipesFromResultSet(safeCopy);
        return recipes;
    }

    public Recipe findOne(String id){
        String uri =  Constant.dbRecipesPref + id;
        SelectBuilder builder = RecipeQueries.findByUri(uri);
        ResultSet safeCopy = transactionWithReturningResultSet(builder);
        Recipe recipe = new Recipe().createDetailOfRecipeFromResultSet(safeCopy, uri);
        return recipe;
    }

    public boolean existFoodWithLabel(String label){
       String ask = WikidataQueries.existFoodByLabel(label);
        return Fuseki.getConnectionRecipes().queryAsk(ask);
    }

    public String getFoodWithLabel(String label){
        String builder = WikidataQueries.findFoodByLabel(label);

        ResultSet safeCopy =
                Txn.calculateRead(Fuseki.getConnectionRecipes(), ()-> {
                    QueryExecution execution = Fuseki.getConnectionRecipes().query(builder);
                    ResultSet result = ResultSetFactory.copyResults(execution.execSelect());
                    execution.close();
                    return  result;
                }) ;

        QuerySolution qs = null;
        while(safeCopy.hasNext()){
            qs = safeCopy.next();
        }
        return qs != null ? qs.getResource(wikiClassVar).getURI() : null;
    }

    private List<String> listOfIncorrectFoodLabelInRecipe(Recipe entity){
        List<String> incorrect = new ArrayList<>();
        for(int i = 0; i < entity.getHasIngredient().size(); i++){
            if(!existFoodWithLabel(entity.getHasIngredient().get(i).getLabel())){
                incorrect.add(entity.getHasIngredient().get(i).getLabel());
            }
        }
        if(!existFoodWithLabel(entity.getProduces().getLabel())){
            incorrect.add(entity.getProduces().getLabel());
        }
        return incorrect;
    }

    private List<String> listOfIncorrectFoodLabelInInstruction(List<Instruction> listOfEntity){
        List<String> incorrect = new ArrayList<>();
        for(Instruction entity: listOfEntity){
            for(int i = 0; i < entity.getHasIngredient().size(); i++){
                if(!existFoodWithLabel(entity.getHasIngredient().get(i).getLabel())){
                    incorrect.add(entity.getHasIngredient().get(i).getLabel());
                }
            }
            if(entity.getProduces() != null && entity.getProduces().getLabel() != null && !entity.getProduces().getLabel().isEmpty()){
                if(!existFoodWithLabel(entity.getProduces().getLabel())){
                    incorrect.add(entity.getProduces().getLabel());
                }
            }
        }
        return incorrect;
    }

    private Recipe setUriForAllFoodInRecipe(Recipe entity){
        List<Ingredient> ingredients = entity.getHasIngredient();
        for(int i = 0; i < entity.getHasIngredient().size(); i++){
            String uri = getFoodWithLabel(ingredients.get(i).getLabel());
            ClassFromWikiData food = new ClassFromWikiData();
            food.setUri(uri);
            ingredients.get(i).setHasFood(food);
        }
        entity.setHasIngredient(ingredients);

        String uri = getFoodWithLabel(entity.getProduces().getLabel());
        ClassFromWikiData food = new ClassFromWikiData();
        food.setUri(uri);
        entity.setProduces(food);
        return entity;
    }

    private List<Instruction> setUriForAllFoodInInstruction(List<Instruction> instructions){

        for(Instruction instruction : instructions){
            List<Ingredient> ingredients = instruction.getHasIngredient();
            for(int i = 0; i < instruction.getHasIngredient().size(); i++){
                String uri = getFoodWithLabel(ingredients.get(i).getLabel());
                ClassFromWikiData food = new ClassFromWikiData();
                food.setUri(uri);
                ingredients.get(i).setHasFood(food);
            }
            instruction.setHasIngredient(ingredients);

            if(instruction.getProduces() != null && instruction.getProduces().getLabel() != null && !instruction.getProduces().getLabel().isEmpty()){
                String uri = getFoodWithLabel(instruction.getProduces().getLabel());
                ClassFromWikiData food = new ClassFromWikiData();
                food.setUri(uri);
                instruction.setProduces(food);
            }
        }

        return instructions;
    }

    public Recipe add(Recipe entity) throws Exception {
        Resource resource = ResourceFactory.createResource (entity.getUri());
        List<String> incorrect = listOfIncorrectFoodLabelInRecipe(entity);
        incorrect.addAll(listOfIncorrectFoodLabelInInstruction(entity.getHasInstructions().getLi()));
        if(incorrect.size() == 0){
            setUriForAllFoodInRecipe(entity);
            setUriForAllFoodInInstruction(entity.getHasInstructions().getLi());
            Txn.executeWrite(Fuseki.getConnectionRecipes(), ()->{
                Model model = entity.addAllPropertiesToModel(resource);
                Fuseki.getConnectionRecipes().load(model);
            });

        } else {
            throw new Exception("Names of these ingredients: " + incorrect + "are not in food list. Check http://localhost:3000/listOf/food");
        }
        return entity;
    }

    public boolean findRecipeByIdAndUsername(String username, String id){
        AskBuilder askBuilder = RecipeQueries.findRecipeByIdAndUsername(username, id);
        return Fuseki.getConnectionRecipes().queryAsk(askBuilder.build()) ;
    }

    public Recipe delete(String username, String id){
        Recipe recipe = null;
        if(findRecipeByIdAndUsername(username, id)){
            recipe = new Recipe();
            recipe.setUri(Constant.dbRecipesPref + id);
            UpdateBuilder updateBuilder = RecipeQueries.deleteRecipeUpdateQuery(recipe);

            Txn.executeWrite(Fuseki.getConnectionRecipes(), ()->{
                Fuseki.getConnectionRecipes().update(updateBuilder.build());
            });
        }
        return recipe;
    }

    public Recipe update(String username, String id, Recipe newEntity) throws Exception {

        delete(username, id);
        add(newEntity);
        return newEntity;
    }

}

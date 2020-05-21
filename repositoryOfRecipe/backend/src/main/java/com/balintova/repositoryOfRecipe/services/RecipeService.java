package com.balintova.repositoryOfRecipe.services;
import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.models.ModelOfEntity;
import com.balintova.repositoryOfRecipe.models.Recipe;
import com.balintova.repositoryOfRecipe.queries.RecipeQueries;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    public List<Recipe> findAll(){
        SelectBuilder builder = RecipeQueries.getAllRecipeQuery();
        QueryExecution qExec = Fuseki.getConnectionRecipes().query(builder.build()) ;

        List<Recipe> recipes = Recipe.createListOfBasicRecipesFromResultSet(qExec.execSelect());

        qExec.close() ;
        return recipes;
    }

    public List<Recipe> findByName(String name){
        SelectBuilder builder = RecipeQueries.findByNameQuery(name);
        QueryExecution qExec = Fuseki.getConnectionRecipes().query(builder.build());

        List<Recipe> recipes = Recipe.createListOfBasicRecipesFromResultSet(qExec.execSelect());

        qExec.close() ;
        return recipes;
    }

    public List<Recipe> findByAuthor(String username){
        SelectBuilder builder = RecipeQueries.findByAuthor(username);
        QueryExecution qExec = Fuseki.getConnectionRecipes().query(builder.build());

        List<Recipe> recipes = Recipe.createListOfBasicRecipesFromResultSet(qExec.execSelect());

        qExec.close() ;
        return recipes;
    }

    public List<Recipe> findByFilterFromUser(List<String> inA, List<String> exA, List<String> inCa, List<String> exCa,
                                             List<String> inCM, List<String> exCM, List<String> inCu, List<String> exCu,
                                             List<String> inK, List<String> exK, List<String> inI, List<String> exI,
                                             String minTime, String maxTime, boolean Aall, boolean CAall, boolean CMall,
                                             boolean CUall,boolean Kall, boolean Iall){

        SelectBuilder builder = RecipeQueries.findByFilterFromUser(inA, exA, inCa, exCa, inCM, exCM, inCu, exCu, inK, exK, inI, exI, minTime, maxTime,
                                                                    Aall, CAall, CMall, CUall, Kall, Iall);
        QueryExecution qExec = Fuseki.getConnectionRecipes().query(builder.build()) ;

        List<Recipe> recipes = Recipe.createListOfBasicRecipesFromResultSet(qExec.execSelect());

        qExec.close() ;
        return recipes;
    }

    public Recipe findOne(String id){
        String uri =  Constant.dbRecipesPref + id;
        SelectBuilder selectBuilder = RecipeQueries.findByUri(uri);
        QueryExecution qExec = Fuseki.getConnectionRecipes().query(selectBuilder.build());

        Recipe recipe = new Recipe().createDetailOfRecipeFromResultSet(qExec.execSelect(), uri);

        qExec.close() ;
        return recipe;
    }

    public Recipe add(Recipe entity){
        Resource resource = ResourceFactory.createResource (entity.getUri());
        Model model = entity.addAllPropertiesToModel(resource);
        Fuseki.getConnectionRecipes().load(model);

        return entity;
    }

    public String delete(ModelOfEntity entity){

        Fuseki.getConnectionRecipes().update(
                "" + Constant.prefixes +
                        "DELETE { ?s ?p ?o } " +
                        "WHERE " +
                        "{ " + entity.getUri() + " (<>|!<>)* ?s. " +
                        "?s ?p ?o . " +
                        "FILTER ( !strstarts(str(?s), \"" + Constant.wikidata + "\") ) " +
                        "}");

        return entity.getUri();
    }

    /*public ModelOfEntity update(ModelOfEntity oldEntity, ModelOfEntity newEntity){
        delete(oldEntity);
        add(newEntity);
        return newEntity;
    }*/






}

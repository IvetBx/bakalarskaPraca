package com.balintova.repositoryOfRecipe.queries;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.arq.querybuilder.ExprFactory;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.arq.querybuilder.WhereBuilder;
import org.apache.jena.datatypes.xsd.XSDDatatype;
import org.apache.jena.datatypes.xsd.XSDDuration;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.sparql.expr.E_LogicalNot;
import org.apache.jena.sparql.expr.E_LogicalOr;
import org.apache.jena.sparql.expr.E_Regex;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;

import java.util.List;

public class RecipeQueries {

    private static ExprFactory exprFactory = new ExprFactory();
    private static String recipeVar = Constant.recipeVar;
    private static String descriptionVar = Constant.descriptionVar;
    private static String labelVar = Constant.labelVar;
    private static String authorVar = Constant.authorVar;
    private static String sVar = Constant.sVar;
    private static String oVar = Constant.oVar;
    private static String pVar = Constant.pVar;
    private static String objectVar = Constant.objectVar;
    private static String objectLabelVar = Constant.objectLabelVar;

    public static SelectBuilder getAllRecipeQuery(){
        SelectBuilder selectBuilder = new SelectBuilder()
                .setDistinct(true)
                .addVar(recipeVar).addVar(descriptionVar).addVar(labelVar)
                .addWhere( recipeVar, RDF.type, Ontology.recipeClass)
                .addWhere( recipeVar, Ontology.hasDescription, descriptionVar)
                .addWhere( recipeVar, RDFS.label, labelVar);
        return selectBuilder;
    }

    public static SelectBuilder findByNameQuery(String name){
        SelectBuilder selectBuilder = getAllRecipeQuery()
                .addFilter(exprFactory.regex(labelVar, name,"i"));
        return selectBuilder;
    }

    public static SelectBuilder findByAuthor(String name){
        String uri = "<" + Constant.dbUsersPref + name +">";
        SelectBuilder selectBuilder = getAllRecipeQuery()
                .addWhere(recipeVar, Ontology.hasAuthor, authorVar)
                .addFilter(exprFactory.sameTerm(authorVar, uri));
        return selectBuilder;
    }

    public static SelectBuilder findByUri(String uri) {
        uri = "<" + uri + ">";
        SelectBuilder selectBuilder = new SelectBuilder()
                .setDistinct(true)
                .addVar(sVar).addVar(pVar).addVar(oVar)
                .addWhere(uri,"(<>|!<>)*", sVar)
                .addWhere(sVar, pVar, oVar);
        return selectBuilder;
    }

    private static E_LogicalOr createFilterWithRegex(List<String> elements, Property property) {
        E_LogicalOr oldRegex = null;
        if(elements != null){
            for (int i = 0; i < elements.size(); i++ ){
                E_Regex newRegex = exprFactory.regex(objectLabelVar + property.getLocalName(), elements.get(i), "i");
                if(i == 0) {
                    E_LogicalNot bound = exprFactory.not(exprFactory.bound(objectLabelVar + property.getLocalName()));
                    oldRegex = exprFactory.or(bound, newRegex);
                } else {
                    oldRegex = exprFactory.or(oldRegex, newRegex);
                }
            }
        }
        return oldRegex;
    }

    private static SelectBuilder createElementOfIncludedRecipesOneFromAll(List<String> filter, SelectBuilder builder, Property property) {
        if(filter != null && filter.size() != 0){
            builder.addOptional(new WhereBuilder().addWhere(recipeVar, property, objectVar + property.getLocalName())
                    .addWhere(objectVar + property.getLocalName(), RDFS.label, objectLabelVar + property.getLocalName()));

            E_LogicalOr allRegex = createFilterWithRegex(filter, property);
            if(allRegex != null) builder.addFilter(allRegex);
        }
        return builder;
    }

    private static SelectBuilder createElementOfIncludedRecipesAllTogether(List<String> filter, SelectBuilder builder, Property property) {
        if(filter != null && filter.size() != 0){
            WhereBuilder whereBuilder = new WhereBuilder();
            for(int i = 0; i < filter.size(); i++){
                whereBuilder.addWhere(recipeVar, property, objectVar + property.getLocalName() + i)
                        .addWhere(objectVar + property.getLocalName() + i, RDFS.label, objectLabelVar + property.getLocalName() + i);
            }
            builder.addOptional(whereBuilder);
            for(int i = 0; i < filter.size(); i++){
                builder.addFilter(exprFactory.regex(objectLabelVar + property.getLocalName() + i, filter.get(i), "i"));
            }
        }
        return builder;
    }

    private static SelectBuilder createElementOfExcludedRecipes(List<String> filter, Property property) {
        if(filter != null && filter.size() != 0){
            SelectBuilder builder = new SelectBuilder().addOptional(new WhereBuilder().addWhere(recipeVar, property, objectVar + property.getLocalName())
                    .addWhere(objectVar + property.getLocalName(), RDFS.label, objectLabelVar + property.getLocalName()));

            E_LogicalOr allRegex = createFilterWithRegex(filter, property);
            if(allRegex != null) builder.addFilter(allRegex);
            return builder;
        }
        return null;
    }

    private static SelectBuilder subqueryIncludedRecipes(List<String> inA, boolean Aall, List<String> inCa, boolean CAall, List<String> inCM, boolean CMall, List<String> inCu,
                                                         boolean CUall, List<String> inK, boolean Kall, List<String> inI, boolean Iall){
        SelectBuilder includedSubQuery = getAllRecipeQuery();
        if(Iall){
            createElementOfIncludedRecipesAllTogether(inI, includedSubQuery, Ontology.hasIngredient);
        } else {
            createElementOfIncludedRecipesOneFromAll(inI, includedSubQuery, Ontology.hasIngredient);
        }
        if(CUall){
            createElementOfIncludedRecipesAllTogether(inCu, includedSubQuery, Ontology.belongsToCuisine);
        } else {
            createElementOfIncludedRecipesOneFromAll(inCu, includedSubQuery, Ontology.belongsToCuisine);
        }
        if(CAall){
            createElementOfIncludedRecipesAllTogether(inCa, includedSubQuery, Ontology.belongsToCategory);
        } else {
            createElementOfIncludedRecipesOneFromAll(inCa, includedSubQuery, Ontology.belongsToCategory);
        }
        if(CMall){
            createElementOfIncludedRecipesAllTogether(inCM, includedSubQuery, Ontology.usingMethod);
        } else {
            createElementOfIncludedRecipesOneFromAll(inCM, includedSubQuery, Ontology.usingMethod);
        }
        if(Kall){
            createElementOfIncludedRecipesAllTogether(inK, includedSubQuery, Ontology.requiresEquipment);
        } else {
            createElementOfIncludedRecipesOneFromAll(inK, includedSubQuery, Ontology.requiresEquipment);
        }
        if(Aall){
            createElementOfIncludedRecipesAllTogether(inA, includedSubQuery, Ontology.hasAuthor);
        } else {
            createElementOfIncludedRecipesOneFromAll(inA, includedSubQuery, Ontology.hasAuthor);
        }
        return includedSubQuery;
    }

    private static SelectBuilder subqueryExcludedRecipes(List<String> exA, List<String> exCa, List<String> exCM, List<String> exCu,
                                                         List<String> exK, List<String> exI){
        SelectBuilder secondSubQuery = new SelectBuilder();
        if(exI.size() != 0) secondSubQuery.addUnion(createElementOfExcludedRecipes(exI, Ontology.hasIngredient));
        if(exCu.size() != 0) secondSubQuery.addUnion(createElementOfExcludedRecipes(exCu, Ontology.belongsToCuisine));
        if(exA.size() != 0) secondSubQuery.addUnion(createElementOfExcludedRecipes(exA, Ontology.hasAuthor));
        if(exCa.size() != 0) secondSubQuery.addUnion(createElementOfExcludedRecipes(exCa,  Ontology.belongsToCategory));
        if(exCM.size() != 0) secondSubQuery.addUnion(createElementOfExcludedRecipes(exCM,  Ontology.usingMethod));
        if(exK.size() != 0) secondSubQuery.addUnion(createElementOfExcludedRecipes(exK,  Ontology.requiresEquipment));
        return secondSubQuery;
    }

    private static SelectBuilder subqueryTime(SelectBuilder selectBuilder, String minTime, String maxTime){
        if(!minTime.isEmpty() && !maxTime.isEmpty()){
            XSDDuration minTimeDur = (XSDDuration) ResourceFactory.createTypedLiteral("PT" + minTime + "M", XSDDatatype.XSDduration).getValue();
            XSDDuration maxTimeDur = (XSDDuration)ResourceFactory.createTypedLiteral("PT" + maxTime + "M", XSDDatatype.XSDduration).getValue();
            selectBuilder.addUnion(new SelectBuilder().addOptional(new WhereBuilder().addWhere(recipeVar, Ontology.hasCookTime, objectVar + Ontology.hasCookTime.getLocalName()))
                    .addFilter(exprFactory.or(exprFactory.lt(objectVar + Ontology.hasCookTime.getLocalName(), minTimeDur), exprFactory.gt(objectVar+ Ontology.hasCookTime.getLocalName(), maxTimeDur))));
        } else if(!minTime.isEmpty()){
            XSDDuration minTimeDur = (XSDDuration)ResourceFactory.createTypedLiteral("PT" + minTime + "M", XSDDatatype.XSDduration).getValue();
            selectBuilder.addUnion(new SelectBuilder().addOptional(new WhereBuilder().addWhere(recipeVar, Ontology.hasCookTime, objectVar + Ontology.hasCookTime.getLocalName()))
                    .addFilter(exprFactory.lt(objectVar + Ontology.hasCookTime.getLocalName(), minTimeDur)));

        } else if(!maxTime.isEmpty()){
            XSDDuration maxTimeDur = (XSDDuration)ResourceFactory.createTypedLiteral("PT" + maxTime + "M", XSDDatatype.XSDduration).getValue();
            selectBuilder.addUnion(new SelectBuilder().addOptional(new WhereBuilder().addWhere(recipeVar, Ontology.hasCookTime, objectVar + Ontology.hasCookTime.getLocalName()))
                    .addFilter(exprFactory.gt(objectVar + Ontology.hasCookTime.getLocalName(), maxTimeDur)));
        }
        return selectBuilder;
    }

    public static SelectBuilder findByFilterFromUser(List<String> inA, List<String> exA, List<String> inCa, List<String> exCa,
                                              List<String> inCM, List<String> exCM, List<String> inCu, List<String> exCu,
                                              List<String> inK, List<String> exK, List<String> inI, List<String> exI,
                                              String minTime, String maxTime, boolean Aall, boolean CAall, boolean CMall,
                                                     boolean CUall,boolean Kall, boolean Iall){

       SelectBuilder firstSubQuery = subqueryIncludedRecipes(inA, Aall, inCa, CAall, inCM, CMall, inCu, CUall, inK, Kall, inI, Iall);
       SelectBuilder secondSubQuery = subqueryExcludedRecipes(exA, exCa, exCM, exCu, exK, exI);
       subqueryTime(secondSubQuery, minTime, maxTime);

        SelectBuilder builder = getAllRecipeQuery()
                .addSubQuery(firstSubQuery)
                .addMinus(secondSubQuery);

        System.out.println(builder);

        return builder;
    }

}

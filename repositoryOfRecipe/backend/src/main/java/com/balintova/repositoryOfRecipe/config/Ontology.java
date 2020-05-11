package com.balintova.repositoryOfRecipe.config;

import org.apache.jena.ontology.OntClass;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Property;

public class Ontology {

    private static OntModel base = (OntModel) ModelFactory.createOntologyModel().read(Constant.ontRecipes, Constant.syntax);

    public static OntModel getModel(){
        return base;
    }

    //constant in ontology

    public static OntClass recipeClass = getModel().getOntClass( Constant.ontRecipes + "Recipe");

    public static OntClass ingredientClass = getModel().getOntClass( Constant.ontRecipes + "Ingredient");

    public static OntClass massClass = getModel().getOntClass( Constant.ontRecipes + "Mass");

    public static OntClass instructionClass = getModel().getOntClass( Constant.ontRecipes + "Instruction");

    public static OntClass ratingClass = getModel().getOntClass( Constant.ontRecipes + "Rating");

    public static Property produces = getModel().getOntProperty(Constant.ontRecipes + "produces");

    public static Property hasInstruction = getModel().getOntProperty(Constant.ontRecipes + "hasInstructions");

    public static Property hasImage = getModel().getOntProperty(Constant.ontRecipes + "hasImage");

    public static Property hasAuthor = getModel().getOntProperty(Constant.ontRecipes + "hasAuthor");

    public static Property hasIngredient = getModel().getOntProperty(Constant.ontRecipes + "hasIngredient");

    public static Property hasRating = getModel().getOntProperty(Constant.ontRecipes + "hasRating");

    public static Property hasCookTime = getModel().getOntProperty(Constant.ontRecipes + "hasCookTime");

    public static Property hasNumberOfPortions = getModel().getOntProperty(Constant.ontRecipes + "hasNumberOfPortion");

    public static Property belongsToCategory = getModel().getOntProperty(Constant.ontRecipes + "belongsToCategory");

    public static Property belongsToCuisine = getModel().getOntProperty(Constant.ontRecipes + "belongsToCuisine");

    public static Property requiresEquipment = getModel().getOntProperty(Constant.ontRecipes + "requiresEquipment");

    public static Property hasDescription = getModel().getOntProperty(Constant.ontRecipes + "hasDescription");

    public static Property needsTemperature = getModel().getOntProperty(Constant.ontRecipes + "needsTemperature");

    public static Property hasEndpoint = getModel().getOntProperty(Constant.ontRecipes + "hasEndPoint");

    public static Property usingMethod = getModel().getOntProperty(Constant.ontRecipes + "usingMethod");

    public static Property hasFood = getModel().getOntProperty(Constant.ontRecipes + "hasFood");

    public static Property hasQuantity = getModel().getOntProperty(Constant.ontRecipes + "hasQuantity");

    public static Property hasMetricQuantity = getModel().getOntProperty(Constant.ontRecipes + "hasMetricQuantity");

    public static Property hasCount = getModel().getOntProperty(Constant.ontRecipes + "hasCount");

    public static Property hasReviewAspect = getModel().getOntProperty(Constant.ontRecipes + "hasReviewAspect");

    public static Property hasRatingValue = getModel().getOntProperty(Constant.ontRecipes + "hasRatingValue");

    public static Property li = getModel().createOntProperty(Constant.rdf + "li");

    public static Property password = getModel().createOntProperty(Constant.ontRecipes + "password");

}

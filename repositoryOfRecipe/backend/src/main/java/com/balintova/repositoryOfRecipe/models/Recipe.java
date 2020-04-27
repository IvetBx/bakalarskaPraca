package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.datatypes.xsd.XSDDuration;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Recipe extends ModelOfEntity{

    String label;
    ClassFromWikiData produces;
    Sequence hasInstructions;
    //Image hasImage;
    //Person hasAuthor;
    List<Ingredient> hasIngredient = new ArrayList<>();
    List<Rating> hasRating = new ArrayList<>();
    XSDDuration hasCookTime;
    Integer hasNumberOfPortions;
    List<String> belongsToCategory = new ArrayList<>();
    List<ClassFromWikiData> belongsToCuisine = new ArrayList<>();
    String hasDescription;
    List<ClassFromWikiData> requiresEquipment = new ArrayList<>();

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public ClassFromWikiData getProduces() {
        return produces;
    }

    public void setProduces(ClassFromWikiData produces) {
        this.produces = produces;
    }

    public Sequence getHasInstructions() {
        return hasInstructions;
    }

    public void setHasInstructions(Sequence hasInstructions) {
        this.hasInstructions = hasInstructions;
    }

    public List<Ingredient> getHasIngredient() {
        return hasIngredient;
    }

    public void setHasIngredient(List<Ingredient> hasIngredient) {
        this.hasIngredient = hasIngredient;
    }

    public List<Rating> getHasRating() {
        return hasRating;
    }

    public void setHasRating(List<Rating> hasRating) {
        this.hasRating = hasRating;
    }

    public XSDDuration getHasCookTime() {
        return hasCookTime;
    }

    public void setHasCookTime(XSDDuration hasCookTime) {
        this.hasCookTime = hasCookTime;
    }

    public Integer getHasNumberOfPortions() {
        return hasNumberOfPortions;
    }

    public void setHasNumberOfPortions(Integer hasNumberOfPortions) {
        this.hasNumberOfPortions = hasNumberOfPortions;
    }

    public List<String> getBelongsToCategory() {
        return belongsToCategory;
    }

    public void setBelongsToCategory(List<String> belongsToCategory) {
        this.belongsToCategory = belongsToCategory;
    }

    public List<ClassFromWikiData> getBelongsToCuisine() {
        return belongsToCuisine;
    }

    public void setBelongsToCuisine(List<ClassFromWikiData> belongsToCuisine) {
        this.belongsToCuisine = belongsToCuisine;
    }

    public String getHasDescription() {
        return hasDescription;
    }

    public void setHasDescription(String hasDescription) {
        this.hasDescription = hasDescription;
    }

    public List<ClassFromWikiData> getRequiresEquipment() {
        return requiresEquipment;
    }

    public void setRequiresEquipment(List<ClassFromWikiData> requiresEquipment) {
        this.requiresEquipment = requiresEquipment;
    }

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object) {

        if (predicate.equals(RDFS.label.getURI())) {
            setLabel(object.asLiteral().getString());

        } else if (predicate.equals(Ontology.hasNumberOfPortions.getURI())) {
            setHasNumberOfPortions(object.asLiteral().getInt());

        } else if (predicate.equals(Ontology.hasCookTime.getURI())) {
            setHasCookTime((XSDDuration)object.asLiteral().getValue());

        } else if (predicate.equals(Ontology.hasDescription.getURI())) {
            setHasDescription(object.asLiteral().getString());

        } else if (predicate.equals(Ontology.produces.getURI())) {
            ClassFromWikiData food = new ClassFromWikiData();
            food.setProperty(result, object.asResource());
            setProduces(food);

        } else if (predicate.equals(Ontology.hasRating.getURI())) {
            Rating rating = new Rating();
            rating.setProperty(result, object.asResource());
            hasRating.add(rating);

        } else if (predicate.equals(Ontology.requiresEquipment.getURI())) {
            ClassFromWikiData equipment = new ClassFromWikiData();
            equipment.setProperty(result, object.asResource());
            requiresEquipment.add(equipment);

        } else if (predicate.equals(Ontology.belongsToCuisine.getURI())) {
            ClassFromWikiData cuisine = new ClassFromWikiData();
            cuisine.setProperty(result, object.asResource());
            belongsToCuisine.add(cuisine);

        } else if (predicate.equals(Ontology.belongsToCategory.getURI())) {
            belongsToCategory.add(object.asLiteral().getString());

        } else if (predicate.equals(Ontology.hasIngredient.getURI())) {
            Ingredient ingredient = new Ingredient();
            ingredient.setProperty(result, object.asResource());
            hasIngredient.add(ingredient);

        } else if (predicate.equals(Ontology.hasInstruction.getURI())) {
            Sequence sequence = new Sequence();
            sequence.setProperty(result, object.asResource());
            setHasInstructions(sequence);
        }
    }

    @Override
    public org.apache.jena.rdf.model.Model addAllPropertiesToModel(Resource resource){
        org.apache.jena.rdf.model.Model model = ModelFactory.createDefaultModel();

        model.add(resource, RDF.type, Ontology.recipeClass);
        model.add(resource, RDFS.label, getLabel());
        model.addLiteral(resource, Ontology.hasNumberOfPortions, getHasNumberOfPortions());
        model.addLiteral(resource, Ontology.hasCookTime, getHasCookTime());
        model.addLiteral(resource, Ontology.hasDescription, getHasDescription());

        for (String category : getBelongsToCategory()){
            model.addLiteral(resource, Ontology.belongsToCategory, category);
        }

        ClassFromWikiData food = getProduces();
        Resource object = ResourceFactory.createResource (food.getUri());
        model.addLiteral(resource, Ontology.produces, object);
        model.add(food.addAllPropertiesToModel(object));

        Sequence instructions = getHasInstructions();
        Resource object2 = ResourceFactory.createResource (instructions.getUri());
        model.addLiteral(resource, Ontology.hasInstruction, object2);
        model.add(instructions.addAllPropertiesToModel(object2));

        for(ClassFromWikiData cuisine : getBelongsToCuisine()){
            Resource object3 = ResourceFactory.createResource (cuisine.getUri());
            model.addLiteral(resource, Ontology.belongsToCuisine, object3);
            model.add(cuisine.addAllPropertiesToModel(object3));
        }

        for(ClassFromWikiData equipment : getRequiresEquipment()){
            Resource object4 = ResourceFactory.createResource (equipment.getUri());
            model.addLiteral(resource, Ontology.requiresEquipment, object4);
            model.add(equipment.addAllPropertiesToModel(object4));
        }

        for(Rating rating : getHasRating()){
            Resource object4 = ResourceFactory.createResource (rating.getUri());
            model.addLiteral(resource, Ontology.hasRating, object4);
            model.add(rating.addAllPropertiesToModel(object4));
        }

        for(Ingredient ingredient : getHasIngredient()){
            Resource object5 = ResourceFactory.createResource (ingredient.getUri());
            model.addLiteral(resource, Ontology.hasIngredient, object5);
            model.add(ingredient.addAllPropertiesToModel(object5));
        }

        return model;
    }


}

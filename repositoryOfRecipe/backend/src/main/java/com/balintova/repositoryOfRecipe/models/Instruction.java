package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.datatypes.xsd.XSDDuration;
import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Instruction extends ModelOfEntity{

    String label;
    Sequence hasInstructions;
    List<Ingredient> hasIngredient = new ArrayList<>();
    ClassFromWikiData produces;                                               //food
    List<ClassFromWikiData> usingMethod = new ArrayList<>();                  //cookingMethod
    List<ClassFromWikiData> requiresEquipment = new ArrayList<>();            //kitchenware
    String hasEndPoint;
    XSDDuration hasCookTime;
    Integer needsTemperature;
    String hasDescription;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
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

    public ClassFromWikiData getProduces() {
        return produces;
    }

    public void setProduces(ClassFromWikiData produces) {
        this.produces = produces;
    }

    public List<ClassFromWikiData> getUsingMethod() {
        return usingMethod;
    }

    public void setUsingMethod(List<ClassFromWikiData> usingMethod) {
        this.usingMethod = usingMethod;
    }

    public List<ClassFromWikiData> getRequiresEquipment() {
        return requiresEquipment;
    }

    public void setRequiresEquipment(List<ClassFromWikiData> requiresEquipment) {
        this.requiresEquipment = requiresEquipment;
    }

    public String getHasEndPoint() {
        return hasEndPoint;
    }

    public void setHasEndPoint(String hasEndPoint) {
        this.hasEndPoint = hasEndPoint;
    }

    public XSDDuration getHasCookTime() {
        return hasCookTime;
    }

    public void setHasCookTime(XSDDuration hasCookTime) {
        this.hasCookTime = hasCookTime;
    }

    public Integer getNeedsTemperature() {
        return needsTemperature;
    }

    public void setNeedsTemperature(Integer needsTemperature) {
        this.needsTemperature = needsTemperature;
    }

    public String getHasDescription() {
        return hasDescription;
    }

    public void setHasDescription(String hasDescription) {
        this.hasDescription = hasDescription;
    }

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object) {

        if (predicate.equals(RDFS.label.getURI())) {
            setLabel(object.asLiteral().getString());

        } else if (predicate.equals(Ontology.hasEndpoint.getURI())) {
            setHasEndPoint(object.asLiteral().getString());

        } else if (predicate.equals(Ontology.needsTemperature.getURI())) {
            setNeedsTemperature(object.asLiteral().getInt());

        } else if (predicate.equals(Ontology.hasCookTime.getURI())) {
            setHasCookTime((XSDDuration)object.asLiteral().getValue());

        } else if (predicate.equals(Ontology.hasDescription.getURI())) {
            setHasDescription(object.asLiteral().getString());

        } else if (predicate.equals(Ontology.requiresEquipment.getURI())) {
            ClassFromWikiData equipment = new ClassFromWikiData();
            equipment.setProperty(result, object.asResource());
            requiresEquipment.add(equipment);

        } else if (predicate.equals(Ontology.usingMethod.getURI())) {
            ClassFromWikiData method = new ClassFromWikiData();
            method.setProperty(result, object.asResource());
            usingMethod.add(method);

        } else if (predicate.equals(Ontology.produces.getURI())) {
            ClassFromWikiData food = new ClassFromWikiData();
            food.setProperty(result, object.asResource());
            setProduces(food);

        }  else if (predicate.equals(Ontology.hasIngredient.getURI())) {
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
    public Model addAllPropertiesToModel(Resource resource){
        Model model = ModelFactory.createDefaultModel();

        model.add(resource, RDF.type, Ontology.instructionClass);
        if(getLabel() != null){
            model.add(resource, RDFS.label, getLabel());
        }
        if(getHasEndPoint() != null){
            model.addLiteral(resource, Ontology.hasEndpoint, getHasEndPoint());
        }
        if(getHasCookTime() != null){
            model.addLiteral(resource, Ontology.hasCookTime, getHasCookTime());
        }
        if(getNeedsTemperature() != null){
            model.addLiteral(resource, Ontology.needsTemperature, getNeedsTemperature());
        }
        if(getHasDescription() != null){
            model.addLiteral(resource, Ontology.hasDescription, getHasDescription());
        }

        ClassFromWikiData food = getProduces();
        if(food != null){
            Resource object = ResourceFactory.createResource (food.getUri());
            model.addLiteral(resource, Ontology.produces, object);
            model.add(food.addAllPropertiesToModel(object));
        }

        Sequence instructions = getHasInstructions();
        if(instructions != null){
            Resource object1 = ResourceFactory.createResource (instructions.getUri());
            model.addLiteral(resource, Ontology.hasInstruction, object1);
            model.add(instructions.addAllPropertiesToModel(object1));
        }

        if(getUsingMethod() != null){
            for(ClassFromWikiData method : getUsingMethod()){
                Resource object2 = ResourceFactory.createResource (method.getUri());
                model.addLiteral(resource, Ontology.usingMethod, object2);
                model.add(method.addAllPropertiesToModel(object2));
            }
        }

        if(getRequiresEquipment() != null){
            for(ClassFromWikiData equipment : getRequiresEquipment()){
                Resource object3 = ResourceFactory.createResource (equipment.getUri());
                model.addLiteral(resource, Ontology.requiresEquipment, object3);
                model.add(equipment.addAllPropertiesToModel(object3));
            }
        }

        if(getHasIngredient() != null){
            for(Ingredient ingredient : getHasIngredient()){
                Resource object4 = ResourceFactory.createResource (ingredient.getUri());
                model.addLiteral(resource, Ontology.hasIngredient, object4);
                model.add(ingredient.addAllPropertiesToModel(object4));
            }
        }

        return model;
    }
}

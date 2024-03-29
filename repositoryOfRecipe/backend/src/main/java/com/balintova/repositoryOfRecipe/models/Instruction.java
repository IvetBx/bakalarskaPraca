package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.datatypes.xsd.XSDDatatype;
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
    com.balintova.repositoryOfRecipe.models.XSDDuration hasCookTime;
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

    public com.balintova.repositoryOfRecipe.models.XSDDuration getHasCookTime() {
        return hasCookTime;
    }

    public void setHasCookTime(com.balintova.repositoryOfRecipe.models.XSDDuration hasCookTime) {
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
            org.apache.jena.datatypes.xsd.XSDDuration xsdDuration1 = (org.apache.jena.datatypes.xsd.XSDDuration) object.asLiteral().getValue();
            com.balintova.repositoryOfRecipe.models.XSDDuration xsdDuration = new com.balintova.repositoryOfRecipe.models.XSDDuration();
            xsdDuration.setMinutes(xsdDuration1.getMinutes());
            xsdDuration.setHours(xsdDuration1.getHours());
            setHasCookTime(xsdDuration);

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
            List<Instruction> a = new ArrayList<>();
            int numberOfStep = result.get(object.asResource()).size() - 1;
            for(int i = 0; i < numberOfStep; i++){
                a.add(null);
            }
            sequence.helpingList = a;
            sequence.setProperty(result, object.asResource());
            setHasInstructions(sequence);
        }

    }

    @Override
    public Model addAllPropertiesToModel(Resource resource){
        Model model = ModelFactory.createDefaultModel();
        model.add(resource, RDF.type, Ontology.instructionClass);
        if(getLabel() != null && !getLabel().isEmpty()){
            model.add(resource, RDFS.label, getLabel());
        }
        if(getHasEndPoint() != null && !getLabel().isEmpty()){
            model.addLiteral(resource, Ontology.hasEndpoint, getHasEndPoint());
        }

        if(getHasCookTime() != null && getHasCookTime().getMinutes() == null){
            getHasCookTime().setMinutes(0);
        }

        if(getHasCookTime() != null && getHasCookTime().getHours() == null){
            getHasCookTime().setHours(0);
        }
        if(getHasCookTime() != null && (getHasCookTime().getMinutes() != 0 || getHasCookTime().getHours() != 0)){
            String duration = "PT" + getHasCookTime().hours + "H" + getHasCookTime().minutes + "M";
            org.apache.jena.datatypes.xsd.XSDDuration xsdDuration =
                    (org.apache.jena.datatypes.xsd.XSDDuration) ResourceFactory.createTypedLiteral(duration, XSDDatatype.XSDduration).getValue();
            model.addLiteral(resource, Ontology.hasCookTime, xsdDuration);
        }

        if(getNeedsTemperature() != null){
            model.addLiteral(resource, Ontology.needsTemperature, getNeedsTemperature());
        }
        if(getHasDescription() != null && !getHasDescription().isEmpty()){
            model.addLiteral(resource, Ontology.hasDescription, getHasDescription());
        }

        ClassFromWikiData food = getProduces();
        if(food != null && !food.getLabel().isEmpty()){
            Resource object = ResourceFactory.createResource (food.getUri());
            model.addLiteral(resource, Ontology.produces, object);
        }

        Sequence instructions = getHasInstructions();
        if(instructions != null && instructions.getLi() != null && instructions.getLi().size() != 0){
            Resource object1 = ResourceFactory.createResource (instructions.getUri());
            model.addLiteral(resource, Ontology.hasInstruction, object1);
            model.add(instructions.addAllPropertiesToModel(object1));
        }

        if(getUsingMethod() != null){
            for(ClassFromWikiData method : getUsingMethod()){
                if(!method.getUri().isEmpty()){
                    Resource object2 = ResourceFactory.createResource (method.getUri());
                    model.addLiteral(resource, Ontology.usingMethod, object2);
                }
            }
        }

        if(getRequiresEquipment() != null){
            for(ClassFromWikiData equipment : getRequiresEquipment()){
                if(!equipment.getUri().isEmpty()) {
                    Resource object3 = ResourceFactory.createResource(equipment.getUri());
                    model.addLiteral(resource, Ontology.requiresEquipment, object3);
                }
            }
        }

        if(getHasIngredient() != null){
            for(Ingredient ingredient : getHasIngredient()){
                if(!ingredient.getUri().isEmpty() && !ingredient.getLabel().isEmpty()) {
                    Resource object4 = ResourceFactory.createResource(ingredient.getUri());
                    model.addLiteral(resource, Ontology.hasIngredient, object4);
                    model.add(ingredient.addAllPropertiesToModel(object4));
                }
            }
        }
        return model;
    }
}

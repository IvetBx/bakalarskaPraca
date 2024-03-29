package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;

import java.util.List;
import java.util.Map;


public class Ingredient extends ModelOfEntity{

    String label;
    ClassFromWikiData hasFood;
    Mass hasQuantity;

    public ClassFromWikiData getHasFood() { return hasFood; }

    public void setHasFood(ClassFromWikiData hasFood) { this.hasFood = hasFood; }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Mass getHasQuantity() {
        return hasQuantity;
    }

    public void setHasQuantity(Mass hasQuantity) {
        this.hasQuantity = hasQuantity;
    }

    @Override
    public boolean stopSearching(){
        if(label != null && hasFood != null && hasQuantity != null){
            return true;
        }
        return false;
    }

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object){

        if(predicate.equals(RDFS.label.getURI())){
            setLabel(object.asLiteral().getString());

        } else if(predicate.equals(Ontology.hasQuantity.getURI())){
            Mass mass = new Mass();
            mass.setProperty(result, object.asResource());;
            setHasQuantity(mass);

        } else if(predicate.equals(Ontology.hasFood.getURI())){
            ClassFromWikiData food = new ClassFromWikiData();
            food.setProperty(result, object.asResource());
            setHasFood(food);

        }
    }

    @Override
    public Model addAllPropertiesToModel(Resource resource){
        Model model = ModelFactory.createDefaultModel();

        model.add(resource, RDF.type, Ontology.ingredientClass);
        model.addLiteral(resource, RDFS.label, getLabel());

        ClassFromWikiData food = getHasFood();
        if(food != null && food.getUri() != null && !food.getUri().isEmpty()){
            Resource object = ResourceFactory.createResource (food.getUri());
            model.addLiteral(resource, Ontology.hasFood, object);
        }

        Mass mass = getHasQuantity();
        if(mass != null && (mass.getHasCount() != null || (mass.getHasMetricQuantity() != null && !mass.getHasMetricQuantity().isEmpty()))){
            Resource object1 = ResourceFactory.createResource (mass.getUri());
            model.addLiteral(resource, Ontology.hasQuantity, object1);
            model.add(mass.addAllPropertiesToModel(object1));
        }

        return model;
    }

}

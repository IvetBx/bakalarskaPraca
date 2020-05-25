package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.vocabulary.RDF;

import java.util.List;
import java.util.Map;


public class Mass extends ModelOfEntity{

    String hasMetricQuantity;
    Double hasCount;

    public String getHasMetricQuantity() {
        return hasMetricQuantity;
    }

    public void setHasMetricQuantity(String hasMetricQuantity) {
        this.hasMetricQuantity = hasMetricQuantity;
    }

    public Double getHasCount() {
        return hasCount;
    }

    public void setHasCount(Double hasCount) {
        this.hasCount = hasCount;
    }

    @Override
    public boolean stopSearching(){
        if(hasCount != null && hasMetricQuantity != null){
            return true;
        }
        return false;
    }

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object){

        if(predicate.equals(Ontology.hasMetricQuantity.getURI())){
            setHasMetricQuantity(object.asLiteral().getString());

        } else if(predicate.equals(Ontology.hasCount.getURI())){
            setHasCount(object.asLiteral().getDouble());
        }

    }

    @Override
    public Model addAllPropertiesToModel(Resource resource){
        Model model = ModelFactory.createDefaultModel();

        model.add(resource, RDF.type, Ontology.massClass);
        if(getHasMetricQuantity() != null && !getHasMetricQuantity().isEmpty()){
            model.addLiteral(resource, Ontology.hasMetricQuantity, getHasMetricQuantity());
        }
        if(getHasCount() != null){
            model.addLiteral(resource, Ontology.hasCount, getHasCount());
        }

        return model;
    }

}

package com.balintova.repositoryOfRecipe.models;

import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.vocabulary.RDFS;
import org.apache.jena.rdf.model.Model;

import java.util.List;
import java.util.Map;


public class ClassFromWikiData extends ModelOfEntity{

    String label;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    @Override
    public boolean stopSearching(){
        if(label != null){
            return true;
        }
        return false;
    }

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object){
        if (predicate.equals(RDFS.label.getURI())) {
            setLabel(object.asLiteral().getString());
        }
    }

    @Override
    public Model addAllPropertiesToModel(Resource resource){
        Model model = ModelFactory.createDefaultModel();

        model.addLiteral(resource, RDFS.label, getLabel());

        return model;
    }

}

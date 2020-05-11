package com.balintova.repositoryOfRecipe.models;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;

import java.util.List;
import java.util.Map;

public class ModelOfEntity {

    String uri;

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public boolean stopSearching(){ return false; }

    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> rs, String predicate, RDFNode object){}

    public void setProperty(Map<Resource, Map<Resource, List<RDFNode>>> result, Resource subject){

        Map<Resource, List<RDFNode>> predicatesAccordingSubject = result.get(subject);
        setUri(subject.getURI());

        for(Resource predicate : predicatesAccordingSubject.keySet()){
            for(int i = 0; i < predicatesAccordingSubject.get(predicate).size(); i++){
                RDFNode object = predicatesAccordingSubject.get(predicate).get(i);
                if(!stopSearching()) checkPredicate(result, predicate.getURI(), object);
            }
        }
    }

    public Model addAllPropertiesToModel(Resource resource){
        return null;
    }

}

package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.vocabulary.RDF;

import java.util.List;
import java.util.Map;


public class Rating extends ModelOfEntity{

    String hasReviewAspect;
    Double hasRatingValue;
    //Person hasAuthor;

    public String getHasReviewAspect() {
        return hasReviewAspect;
    }

    public void setHasReviewAspect(String hasReviewAspect) {
        this.hasReviewAspect = hasReviewAspect;
    }

    public Double getHasRatingValue() {
        return hasRatingValue;
    }

    public void setHasRatingValue(Double hasRatingValue) {
        this.hasRatingValue = hasRatingValue;
    }

    @Override
    public boolean stopSearching(){
        if(hasRatingValue != null && hasReviewAspect != null){
            return true;
        }
        return false;
    }

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object){
        if(predicate.equals(Ontology.hasReviewAspect.getURI())){
            setHasReviewAspect(object.asLiteral().getString());

        } else if(predicate.equals(Ontology.hasRatingValue.getURI())){
            setHasRatingValue(object.asLiteral().getDouble());
        }
    }

    @Override
    public org.apache.jena.rdf.model.Model addAllPropertiesToModel(Resource resource){
        org.apache.jena.rdf.model.Model model = ModelFactory.createDefaultModel();

        model.add(resource, RDF.type, Ontology.ratingClass);
        model.addLiteral(resource, Ontology.hasReviewAspect, getHasReviewAspect());
        model.addLiteral(resource, Ontology.hasRatingValue, getHasRatingValue());

        return model;
    }

}

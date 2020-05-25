package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Constant;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDFS;

import java.util.ArrayList;
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

    public static List<ClassFromWikiData> createListOfAllClass(ResultSet safeCopy){
        List<ClassFromWikiData> listOfWikidataEntity = new ArrayList<>();

        while(safeCopy.hasNext()) {
            QuerySolution qs = safeCopy.next();
            Resource wikiClass = qs.getResource(Constant.wikiClassVar);
            Literal lab = qs.getLiteral(Constant.labelVar);
            ClassFromWikiData classFromWikiData = new ClassFromWikiData();
            classFromWikiData.setUri(wikiClass.getURI());
            classFromWikiData.setLabel(lab.getString());
            listOfWikidataEntity.add(classFromWikiData);
        }

        return listOfWikidataEntity;
    }

}

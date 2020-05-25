package com.balintova.repositoryOfRecipe.models;

import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;

import java.util.ArrayList;
import java.util.List;

public class InformationAboutWikiClass {

    String property;
    String labelProperty;
    String object;
    String objectLabel;

    public InformationAboutWikiClass(String property, String labelProperty, String object, String objectLabel) {
        this.property = property;
        this.labelProperty = labelProperty;
        this.object = object;
        this.objectLabel = objectLabel;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getLabelProperty() {
        return labelProperty;
    }

    public void setLabelProperty(String labelProperty) {
        this.labelProperty = labelProperty;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getObjectLabel() {
        return objectLabel;
    }

    public void setObjectLabel(String objectLabel) {
        this.objectLabel = objectLabel;
    }

    public static List<InformationAboutWikiClass> createDetailOfClass(ResultSet safeCopy){
        List<InformationAboutWikiClass> result = new ArrayList<>();
        System.out.println("SOM");
        while(safeCopy.hasNext()){
            QuerySolution qs = safeCopy.next() ;
            String property = qs.get("?ps").toString();
            String object = qs.get("?ps_").toString();
            String labProperty = qs.get("?wdLabel").toString().replace("@en", "");
            String labObject = qs.get("?ps_Label").toString().replace("@en", "");
            InformationAboutWikiClass info = new InformationAboutWikiClass(property, labProperty, object, labObject);
            result.add(info);
        }
        return result;
    }
}

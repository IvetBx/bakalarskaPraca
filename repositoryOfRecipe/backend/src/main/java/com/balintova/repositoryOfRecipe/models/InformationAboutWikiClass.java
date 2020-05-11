package com.balintova.repositoryOfRecipe.models;

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
}

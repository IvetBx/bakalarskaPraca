package com.balintova.repositoryOfRecipe.controllers.models;

import org.apache.jena.datatypes.xsd.XSDDuration;

import java.awt.*;

public class Instruction {

    String label;
    List hasInstruction;
    List hasIngredient;
    List usingMethod;
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

    public List getHasInstruction() {
        return hasInstruction;
    }

    public void setHasInstruction(List hasInstruction) {
        this.hasInstruction = hasInstruction;
    }

    public List getHasIngredient() {
        return hasIngredient;
    }

    public void setHasIngredient(List hasIngredient) {
        this.hasIngredient = hasIngredient;
    }

    public List getUsingMethod() {
        return usingMethod;
    }

    public void setUsingMethod(List usingMethod) {
        this.usingMethod = usingMethod;
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
}

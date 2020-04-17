package com.balintova.repositoryOfRecipe.controllers.models;

import org.apache.jena.datatypes.xsd.XSDDuration;
import java.util.*;

public class Recipe {

    String label;
    List<Instruction> hasInstructions;
    List<Ingredient> hasIngredient;
    XSDDuration hasCookTime;
    Integer hasNumberOfPortions;
    List<String> belongsToCategory;
    String hasDescription;
    List<Recipe> sameAs;

    public Recipe(){

    }

    public Recipe(String label, List<Instruction> hasInstructions, List<Ingredient> hasIngredient, XSDDuration hasCookTime, Integer hasNumberOfPortions, List<String> belongsToCategory, String hasDescription, List<Recipe> sameAs) {
        this.label = label;
        this.hasInstructions = hasInstructions;
        this.hasIngredient = hasIngredient;
        this.hasCookTime = hasCookTime;
        this.hasNumberOfPortions = hasNumberOfPortions;
        this.belongsToCategory = belongsToCategory;
        this.hasDescription = hasDescription;
        this.sameAs = sameAs;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<Instruction> getHasInstructions() {
        return hasInstructions;
    }

    public void setHasInstructions(List<Instruction> hasInstructions) {
        this.hasInstructions = hasInstructions;
    }

    public List<Ingredient> getHasIngredient() {
        return hasIngredient;
    }

    public void setHasIngredient(List<Ingredient> hasIngredient) {
        this.hasIngredient = hasIngredient;
    }

    public XSDDuration getHasCookTime() {
        return hasCookTime;
    }

    public void setHasCookTime(XSDDuration hasCookTime) {
        this.hasCookTime = hasCookTime;
    }

    public Integer getHasNumberOfPortions() {
        return hasNumberOfPortions;
    }

    public void setHasNumberOfPortions(Integer hasNumberOfPortions) {
        this.hasNumberOfPortions = hasNumberOfPortions;
    }

    public List<String> getBelongsToCategory() {
        return belongsToCategory;
    }

    public void setBelongsToCategory(List<String> belongsToCategory) {
        this.belongsToCategory = belongsToCategory;
    }

    public String getHasDescription() {
        return hasDescription;
    }

    public void setHasDescription(String hasDescription) {
        this.hasDescription = hasDescription;
    }

    public List<Recipe> getSameAs() {
        return sameAs;
    }

    public void setSameAs(List<Recipe> sameAs) {
        this.sameAs = sameAs;
    }
}

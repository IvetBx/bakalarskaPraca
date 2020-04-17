package com.balintova.repositoryOfRecipe.controllers.models;

public class Ingredient {

    String label;
    Mass hasQuantity;

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
}

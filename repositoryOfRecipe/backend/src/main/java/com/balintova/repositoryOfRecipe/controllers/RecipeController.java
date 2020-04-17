package com.balintova.repositoryOfRecipe.controllers.services;

import java.util.*;

import com.balintova.repositoryOfRecipe.controllers.models.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/recipes")
    public List<Recipe> getAllRecipes(){
        return recipeService.findAll();
    }

}

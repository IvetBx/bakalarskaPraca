package com.balintova.repositoryOfRecipe.controllers;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.services.RecipeService;
import com.balintova.repositoryOfRecipe.models.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/recipes")
    public List<Recipe> getAllRecipes(){
        return recipeService.findAll();
    }

  /*  @GetMapping("/recipes/{id}")
    public Recipe getOne(@PathVariable int id){
        return recipeService.findOne(Constant.dbRecipesPref + id);
    }*/

}

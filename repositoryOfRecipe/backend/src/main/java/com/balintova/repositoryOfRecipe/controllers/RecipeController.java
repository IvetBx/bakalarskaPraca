package com.balintova.repositoryOfRecipe.controllers;
import com.balintova.repositoryOfRecipe.models.Recipe;
import com.balintova.repositoryOfRecipe.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/recipes")
    public List<Recipe> getAllRecipes() {
        return recipeService.findAll();
    }

    @GetMapping("/recipes/{recipeName}")
    public List<Recipe> getAllRecipes(@PathVariable String recipeName)  {
        return recipeService.findByName(recipeName);
    }

    @GetMapping("/recipes/filters/inA={inA}&exA={exA}&inCa={inCa}&exCa={exCa}&inCM={inCM}&exCM={exCM}" +
            "&inCu={inCu}&exCu={exCu}&inK={inK}&exK={exK}&inI={inI}&exI={exI}&minTime={minTime}&maxTime={maxTime}&minRating={minRating}&maxRating={maxRating}")
    public List<Recipe> getAllRecipesAccordingFilters(@PathVariable List<String> inA, @PathVariable List<String> exA,
                               @PathVariable List<String> inCa, @PathVariable List<String> exCa,
                               @PathVariable List<String> inCM, @PathVariable List<String> exCM,
                               @PathVariable List<String> inCu, @PathVariable List<String> exCu,
                               @PathVariable List<String> inK, @PathVariable List<String> exK,
                               @PathVariable List<String> inI, @PathVariable List<String> exI,
                               @PathVariable Double minRating, @PathVariable Double maxRating,
                               @PathVariable String minTime, @PathVariable String maxTime){
        return recipeService.findByFilterFromUser(inA, exA, inCa, exCa, inCM, exCM, inCu, exCu,
                inK, exK, inI, exI, minTime, maxTime, minRating, maxRating);
    }

    @GetMapping("/recipes/detail/{uri}")
    public Recipe getDetailAboutRecipe(@PathVariable String uri)  {
        return recipeService.findOne(uri);
    }



}

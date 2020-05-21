package com.balintova.repositoryOfRecipe.controllers;
import com.balintova.repositoryOfRecipe.models.Person;
import com.balintova.repositoryOfRecipe.models.Recipe;
import com.balintova.repositoryOfRecipe.services.RecipeService;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

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
            "&inCu={inCu}&exCu={exCu}&inK={inK}&exK={exK}&inI={inI}&exI={exI}&minTime={minTime}&maxTime={maxTime}" +
            "&Aall={Aall}&CAall={CAall}&CMall={CMall}&CUall={CUall}&Kall={Kall}&Iall={Iall}")
    public List<Recipe> getAllRecipesAccordingFilters(@PathVariable List<String> inA, @PathVariable List<String> exA,
                               @PathVariable List<String> inCa, @PathVariable List<String> exCa,
                               @PathVariable List<String> inCM, @PathVariable List<String> exCM,
                               @PathVariable List<String> inCu, @PathVariable List<String> exCu,
                               @PathVariable List<String> inK, @PathVariable List<String> exK,
                               @PathVariable List<String> inI, @PathVariable List<String> exI,
                               @PathVariable String minTime, @PathVariable String maxTime,
                               @PathVariable boolean Aall, @PathVariable boolean CAall, @PathVariable boolean CMall,
                               @PathVariable boolean CUall, @PathVariable boolean Kall, @PathVariable boolean Iall){
        return recipeService.findByFilterFromUser(inA, exA, inCa, exCa, inCM, exCM, inCu, exCu, inK, exK, inI, exI, minTime, maxTime, Aall, CAall, CMall, CUall, Kall, Iall);
    }

    @GetMapping("/recipes/user={username}")
    public List<Recipe> getAllRecipesFromAuthor(@PathVariable String username)  {
        return recipeService.findByAuthor(username);
    }

    @GetMapping("/recipes/detail/{id}")
    public Recipe getDetailAboutRecipe(@PathVariable String id)  {
        return recipeService.findOne(id);
    }


    @PostMapping("/recipes")
    public ResponseEntity<Void> addRecipe(@RequestBody Recipe recipe) {
        try {
            recipeService.add(recipe);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }

    }


}

package com.balintova.repositoryOfRecipe.controllers;

import com.balintova.repositoryOfRecipe.models.ClassFromWikiData;
import com.balintova.repositoryOfRecipe.models.InformationAboutWikiClass;
import com.balintova.repositoryOfRecipe.services.WikidataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class WikidataController {

    @Autowired
    private WikidataService wikidataListService;

    @GetMapping("/listOf/food")
    public List<ClassFromWikiData> getAllFood() {
        return wikidataListService.findAll("food");
    }

    @GetMapping("/listOf/cookingMethod")
    public List<ClassFromWikiData> getAllCookingMethods() {
        return wikidataListService.findAll("cookingMethod");
    }

    @GetMapping("/listOf/cuisine")
    public List<ClassFromWikiData> getAllCuisines() {
        return wikidataListService.findAll("cuisine");
    }

    @GetMapping("/listOf/kitchenware")
    public List<ClassFromWikiData> getAllKitchenware() {
        return wikidataListService.findAll("kitchenware");
    }

    @GetMapping("/listOf/moreInfo/{uri}")
    public List<InformationAboutWikiClass> getAllX(@PathVariable String uri) {
        return wikidataListService.findByUri(uri);
    }

}

package com.balintova.repositoryOfRecipe;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.datatypes.xsd.XSDDuration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RepositoryOfRecipeApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(RepositoryOfRecipeApplication.class, args);
		Fuseki.setConnectionRecipes(Constant.recipesSparqlEndpoint);
		Fuseki.setConnectionUsers(Constant.usersSparqlEndpoint);
		Fuseki.setConnectionWikidata(Constant.wikidataSparqlEndpoint);
		Ontology ontology = new Ontology();
	}
}

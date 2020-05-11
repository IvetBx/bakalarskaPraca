package com.balintova.repositoryOfRecipe;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class RepositoryOfRecipeApplication {

	public static void main(String[] args) throws IOException {

		SpringApplication.run(RepositoryOfRecipeApplication.class, args);
		Fuseki.setConnection(Constant.dbRecipes);
	}
}

package com.balintova.repositoryOfRecipe.config;

public class Constant {

    public static String dbRecipes = "http://localhost:3030/myFirstRecipes";

    public static String dbRecipesPref = "http://localhost:3030/myFirstRecipes#";

    public static String ontRecipes = "http://www.st.fmph.uniba.sk/~balintova37/ontology/finalOntologyAboutRecipe.owl#";

    public static String syntax = "TURTLE";

    public static String rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";

    public static String rdfs = "http://www.w3.org/2000/01/rdf-schema#";

    public static String owl = "https://www.w3.org/2002/07/owl#";

    public static String wikidata = "https://www.wikidata.org/";

    public static String formatPrefix = "PREFIX %s:<%s> ";

    public static String prefixes = String.format(formatPrefix, "", ontRecipes) +
                                    String.format(formatPrefix, "rdf", rdf) +
                                    String.format(formatPrefix, "rdfs", rdfs) +
                                    String.format(formatPrefix, "owl", owl);

    public static String formatTRIPLE_0 = "%s %s %s.";

    public static String formatTRIPLE_1 = "<%s> %s %s.";




}

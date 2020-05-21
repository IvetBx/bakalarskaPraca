package com.balintova.repositoryOfRecipe.config;

import org.apache.jena.rdfconnection.RDFConnection;
import org.apache.jena.rdfconnection.RDFConnectionFactory;
import org.apache.jena.rdfconnection.RDFConnectionFuseki;

public class Fuseki {

    private static RDFConnectionFuseki connectionFusekiRecipes;
    private static RDFConnectionFuseki connectionFusekiUsers;
    private static RDFConnection connectionWikidata;

    public static void setConnectionRecipes(String destination) {
        RDFConnection builder = RDFConnectionFuseki.create()
                .destination(destination)
                .build();
        connectionFusekiRecipes = (RDFConnectionFuseki)builder;
    }

    public static void setConnectionUsers(String destination) {
        RDFConnection builder = RDFConnectionFuseki.create()
                .destination(destination)
                .build();
        connectionFusekiUsers = (RDFConnectionFuseki)builder;
    }

    public static void setConnectionWikidata(String destination) {
        RDFConnection builder = RDFConnectionFactory.connect(destination);
        connectionWikidata = builder;
    }

    public static RDFConnectionFuseki getConnectionRecipes(){
        return connectionFusekiRecipes;
    }

    public static RDFConnectionFuseki getConnectionUser() { return connectionFusekiUsers; }

    public static RDFConnection getConnectionWikidata(){
        return connectionWikidata;
    }

    public static void close(){
        connectionFusekiUsers.close();
        connectionFusekiRecipes.close();
        connectionWikidata.close();
    }



}

package com.balintova.repositoryOfRecipe.config;

import org.apache.jena.rdfconnection.RDFConnection;
import org.apache.jena.rdfconnection.RDFConnectionFuseki;

public class Fuseki {

    private static RDFConnectionFuseki connectionFuseki;

    public static void setConnection(String destination) {
        RDFConnection builder = RDFConnectionFuseki.create()
                .destination(destination)
                .build();
        connectionFuseki = (RDFConnectionFuseki)builder;
    }

    public static RDFConnectionFuseki getConnection(){
        return connectionFuseki;
    }

    public static void close(){
        connectionFuseki.close();
    }

}

package com.balintova.repositoryOfRecipe.queries;

import com.balintova.repositoryOfRecipe.config.Constant;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.vocabulary.RDFS;

public class WikidataQueries {

    static String wikiClassVar = Constant.wikiClassVar;
    static String labelVar = Constant.labelVar;

    public static SelectBuilder findAllQuery (String nameOfEntity){

        SelectBuilder selectBuilder = new SelectBuilder()
                .setDistinct(true)
                .addVar(wikiClassVar).addVar(labelVar)
                .addWhere(wikiClassVar, RDFS.comment, nameOfEntity)
                .addWhere( wikiClassVar, RDFS.label, labelVar)
                .addOrderBy(labelVar);
        return selectBuilder;
    }

    public static String findByUriQuery(String uri){
        String selectBuilder = "" +
                "PREFIX wd: <http://www.wikidata.org/entity/>" +
                "PREFIX wikibase: <http://wikiba.se/ontology#>" +
                "PREFIX bd: <http://www.bigdata.com/rdf#>" +
                "SELECT ?wdLabel ?statement ?ps ?ps_ ?ps_Label {\n" +
                "  VALUES (?company) {(wd:" + uri + ")}\n" +
                "\n" +
                "  ?company ?p ?statement .\n" +
                "  ?statement ?ps ?ps_ .\n" +
                "\n" +
                "  ?wd wikibase:claim ?p.\n" +
                "  ?wd wikibase:statementProperty ?ps.\n" +
                "\n" +
                "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\" }\n" +
                "} ORDER BY ?wd ?statement ?ps_";
        return selectBuilder;
    }

    public static String existFoodByLabel(String label){
        String selectBuilder = "ASk {?wikiClass  <http://www.w3.org/2000/01/rdf-schema#label>  \"" + label + "\"@en ; " +
                "<http://www.w3.org/2000/01/rdf-schema#comment>  \"food\".}";
        return selectBuilder;
    }

    public static String findFoodByLabel(String label){
        String selectBuilder = "SELECT ?wikiClass " +
                "WHERE { ?wikiClass  <http://www.w3.org/2000/01/rdf-schema#label> \"" + label + "\"@en }";
        return selectBuilder;
    }

}

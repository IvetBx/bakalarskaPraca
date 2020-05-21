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
        System.out.println(selectBuilder);
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

}

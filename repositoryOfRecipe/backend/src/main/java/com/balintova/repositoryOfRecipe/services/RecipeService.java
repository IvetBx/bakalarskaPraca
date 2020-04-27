package com.balintova.repositoryOfRecipe.services;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.models.Recipe;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdfconnection.RDFConnection;
import org.apache.jena.rdfconnection.RDFConnectionFuseki;
import org.apache.jena.rdfconnection.SparqlQueryConnection;
import org.apache.jena.rdfconnection.SparqlUpdateConnection;
import org.apache.jena.vocabulary.RDFS;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class RecipeService extends ServiceOfEntity{

    public List<Recipe> findAll(){

		Query query = QueryFactory.create(
                "" + Constant.prefixes +
                        "SELECT DISTINCT ?recipe ?desc ?lab { " +
                        "?recipe a :Recipe;" +
                        "        :hasDescription ?desc;" +
                        "        rdfs:label ?lab." +
                        "}"
        );

		List<Recipe> recipes = new ArrayList<>();

		QueryExecution qExec = Fuseki.getConnection().query(query) ;
        ResultSet rs = qExec.execSelect() ;
        while(rs.hasNext()) {
            QuerySolution qs = rs.next() ;

            Resource recipe = qs.getResource("recipe");
            Literal desc = qs.getLiteral("desc");
            Literal lab = qs.getLiteral("lab");

            Recipe recipe1 = new Recipe();
            recipe1.setUri(recipe.getURI());
            recipe1.setLabel(lab.getString());
            recipe1.setHasDescription(desc.getString());
            recipes.add(recipe1);
        }
        qExec.close() ;

        return recipes;
    }

    public void pokus4() throws IOException {

        RDFConnection builder = RDFConnectionFuseki.create()
                .destination("https://query.wikidata.org/sparql")
                .build();

        QueryExecution qe = builder.query("SELECT DISTINCT ?b ?lab\n" +
                "WHERE\n" +
                "{  \n" +
                "{\n" +
                "  ?b wdt:P279* wd:Q1521410.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "  FILTER NOT EXISTS {?b wdt:P31 wd:Q18593264}.\n" +
                "  FILTER NOT EXISTS {?b wdt:P31 wd:Q220659}\n" +
                "  FILTER NOT EXISTS {?b wdt:P31 wd:Q3643463}\n" +
                "  FILTER NOT EXISTS {?b wdt:P276 ?y}\n" +
                "  FILTER NOT EXISTS {?b wdt:P195 ?x}\n" +
                "\n" +
                "}\n" +
                "  \n" +
                "  UNION \n" +
                "  {\n" +
                "  ?b wdt:P31 wd:Q1521410.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "  FILTER NOT EXISTS {?b wdt:P31 wd:Q18593264}.\n" +
                "  FILTER NOT EXISTS {?b wdt:P31 wd:Q220659}\n" +
                "  FILTER NOT EXISTS {?b wdt:P31 wd:Q3643463}\n" +
                "  FILTER NOT EXISTS {?b wdt:P276 ?y}\n" +
                "  FILTER NOT EXISTS {?b wdt:P195 ?x}\n" +
                "\n" +
                "}\n" +
                "}\n" +
                "ORDER BY ?lab" +

                "");

        Model model = ModelFactory.createDefaultModel();
        FileWriter out = new FileWriter("dataKitchenware.ttl");


        ResultSet rs = qe.execSelect();
        while(rs.hasNext()){
            QuerySolution qs = rs.next() ;
            Resource subject = qs.getResource("b");
            Literal object = qs.getLiteral("lab");
            model.add(subject, RDFS.label, object);
        }
        qe.close();
        builder.close();

        model.write(out, "TTL");
        out.close();

        System.out.println("KONIEC");
    }


    public void pokus3() throws IOException {

        RDFConnection builder = RDFConnectionFuseki.create()
                .destination("https://query.wikidata.org/sparql")
                .build();

        QueryExecution qe = builder.query("" +
                "SELECT DISTINCT ?b ?lab\n" +
                "WHERE\n" +
                "  {\n" +
                "{\n" +
                "  ?b wdt:P279* wd:Q1039303.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "}\n" +
                "  UNION\n" +
                "  {\n" +
                "  ?b wdt:P279 wd:Q1039303.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "\n" +
                "}\n" +
                "  UNION\n" +
                "  {\n" +
                "  ?b wdt:P31 wd:Q1039303.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "\n" +
                "}\n" +
                "\n" +
                "  }" +
                "ORDER BY ?lab" +
                "");

        Model model = ModelFactory.createDefaultModel();
        FileWriter out = new FileWriter("dataMethod.ttl");


        ResultSet rs = qe.execSelect();
        while(rs.hasNext()){
            QuerySolution qs = rs.next() ;
            Resource subject = qs.getResource("b");
            Literal object = qs.getLiteral("lab");
            model.add(subject, RDFS.label, object);
        }
        qe.close();
        builder.close();

        model.write(out, "TTL");
        out.close();

        System.out.println("KONIEC");
    }


    public void pokus2() throws IOException {

        RDFConnection builder = RDFConnectionFuseki.create()
                .destination("https://query.wikidata.org/sparql")
                .build();

        QueryExecution qe = builder.query("" +
                "\n" +
                "SELECT DISTINCT ?b ?lab\n" +
                "WHERE{\n" +
                "  \n" +
                "{\n" +
                "  ?b wdt:P279* wd:Q1778821.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "\n" +
                "}\n" +
                "  UNION\n" +
                "  {\n" +
                "  ?b wdt:P279 wd:Q1778821.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "\n" +
                "}\n" +
                "  UNION\n" +
                "  {\n" +
                "  ?b wdt:P31 wd:Q1778821.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "\n" +
                "}\n" +
                "\n" +
                "  }\n" +
                "ORDER BY ?lab" +
                "");

        Model model = ModelFactory.createDefaultModel();
        FileWriter out = new FileWriter("dataCuisine.ttl");


        ResultSet rs = qe.execSelect();
        while(rs.hasNext()){
            QuerySolution qs = rs.next() ;
            Resource subject = qs.getResource("b");
            Literal object = qs.getLiteral("lab");
            model.add(subject, RDFS.label, object);
        }
        qe.close();
        builder.close();

        model.write(out, "TTL");
        out.close();

        System.out.println("KONIEC");
    }


    public void pokus() throws IOException {

        RDFConnection builder = RDFConnectionFuseki.create()
                .destination("https://query.wikidata.org/sparql")
                .build();

        QueryExecution qe = builder.query("" +
                "SELECT DISTINCT ?b ?lab\n" +
                "WHERE{\n" +
                "{\n" +
                "  ?b wdt:P279* wd:Q2095.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "      FILTER NOT EXISTS {?b wdt:P31 wd:Q11173}\n" +
                "\n" +
                "}\n" +
                "     UNION\n" +
                "  {\n" +
                "  ?b wdt:P31 wd:Q2095.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "      FILTER NOT EXISTS {?b wdt:P31 wd:Q11173}\n" +
                "\n" +
                "}\n" +
                "    UNION\n" +
                "  {\n" +
                "  ?b wdt:P279 wd:Q2095.\n" +
                "  ?b rdfs:label ?lab\n" +
                "  filter(lang(?lab) = \"en\").\n" +
                "      FILTER NOT EXISTS {?b wdt:P31 wd:Q11173}\n" +
                "}\n" +
                "\n" +
                "\n" +
                "\n" +
                "}\n" +
                "ORDER BY ?lab" +
                "");

        Model model = ModelFactory.createDefaultModel();
        FileWriter out = new FileWriter("dataFood.ttl");


        ResultSet rs = qe.execSelect();
        while(rs.hasNext()){
            QuerySolution qs = rs.next() ;
            Resource subject = qs.getResource("b");
            Literal object = qs.getLiteral("lab");
            model.add(subject, RDFS.label, object);
        }
        qe.close();
        builder.close();

        model.write(out, "TTL");
        out.close();

        System.out.println("KONIEC");
    }




}

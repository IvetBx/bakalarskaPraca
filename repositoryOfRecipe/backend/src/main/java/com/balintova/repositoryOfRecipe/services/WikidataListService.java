package com.balintova.repositoryOfRecipe.services;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.models.ClassFromWikiData;
import com.balintova.repositoryOfRecipe.models.InformationAboutWikiClass;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.atlas.json.JSON;
import org.apache.jena.atlas.json.JsonObject;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdfconnection.RDFConnection;
import org.apache.jena.rdfconnection.RDFConnectionFuseki;
import org.apache.jena.vocabulary.RDFS;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class WikidataListService {

    public static void time() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        System.out.println( sdf.format(cal.getTime()) );
    }

    public List<ClassFromWikiData> findAll(String nameOfEntity){

        time();

        SelectBuilder builder = new SelectBuilder()
                .addPrefix( "rdfs",  Constant.rdfs )
                .setDistinct(true)
                .addVar( "?wikiClass").addVar( "?lab" )
                .addWhere("?wikiClass", RDFS.comment, nameOfEntity)
                .addWhere( "?wikiClass", RDFS.label, "?lab")
                .addOrderBy("?lab");

        List<ClassFromWikiData> listOfWikidataEntity = new ArrayList<>();

        QueryExecution qExec = Fuseki.getConnection().query(builder.build()) ;
        ResultSet rs = qExec.execSelect() ;
        while(rs.hasNext()) {
            QuerySolution qs = rs.next();
            Resource wikiClass = qs.getResource("wikiClass");
            Literal lab = qs.getLiteral("lab");
            ClassFromWikiData classFromWikiData = new ClassFromWikiData();
            classFromWikiData.setUri(wikiClass.getURI());
            classFromWikiData.setLabel(lab.getString());
            listOfWikidataEntity.add(classFromWikiData);
        }
        qExec.close() ;
        time();
        return listOfWikidataEntity;
    }

    public List<InformationAboutWikiClass> findByUri(String uri){

        time();

        RDFConnection builder = RDFConnectionFuseki.create()
                .destination("https://query.wikidata.org/sparql")
                .build();

        QueryExecution qe = builder.query("" +
                "" +
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
                "} ORDER BY ?wd ?statement ?ps_");

        List<InformationAboutWikiClass> result = new ArrayList<>();

        ResultSet rs = qe.execSelect();
        while(rs.hasNext()){
            QuerySolution qs = rs.next() ;
            String property = qs.get("?ps").toString();
            String object = qs.get("?ps_").toString();
            String labProperty = qs.get("?wdLabel").toString().replace("@en", "");
            String labObject = qs.get("?ps_Label").toString().replace("@en", "");
            InformationAboutWikiClass info = new InformationAboutWikiClass(property, labProperty, object, labObject);
            result.add(info);
        }
        qe.close();
        builder.close();
        time();
        return result;
    }



}

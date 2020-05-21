package com.balintova.repositoryOfRecipe.services;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.models.ClassFromWikiData;
import com.balintova.repositoryOfRecipe.models.InformationAboutWikiClass;
import com.balintova.repositoryOfRecipe.queries.WikidataQueries;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WikidataService {

    private String wikiClassVar = Constant.wikiClassVar;
    private String labelVar = Constant.labelVar;

    public List<ClassFromWikiData> findAll(String nameOfEntity){

        SelectBuilder selectBuilder = WikidataQueries.findAllQuery(nameOfEntity);

        List<ClassFromWikiData> listOfWikidataEntity = new ArrayList<>();

        QueryExecution qExec = Fuseki.getConnectionRecipes().query(selectBuilder.build()) ;
        ResultSet rs = qExec.execSelect() ;
        while(rs.hasNext()) {
            QuerySolution qs = rs.next();
            Resource wikiClass = qs.getResource(wikiClassVar);
            Literal lab = qs.getLiteral(labelVar);
            ClassFromWikiData classFromWikiData = new ClassFromWikiData();
            classFromWikiData.setUri(wikiClass.getURI());
            classFromWikiData.setLabel(lab.getString());
            listOfWikidataEntity.add(classFromWikiData);
        }
        qExec.close() ;
        return listOfWikidataEntity;
    }

    public List<InformationAboutWikiClass> findByUri(String uri){

        String selectBuilder = WikidataQueries.findByUriQuery(uri);
        QueryExecution qe = Fuseki.getConnectionWikidata().query(selectBuilder);
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

        return result;
    }




}

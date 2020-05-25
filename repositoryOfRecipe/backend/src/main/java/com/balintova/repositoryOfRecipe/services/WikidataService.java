package com.balintova.repositoryOfRecipe.services;

import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.models.ClassFromWikiData;
import com.balintova.repositoryOfRecipe.models.InformationAboutWikiClass;
import com.balintova.repositoryOfRecipe.queries.WikidataQueries;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFactory;
import org.apache.jena.rdfconnection.RDFConnection;
import org.apache.jena.system.Txn;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WikidataService {

    private ResultSet transactionWithReturningResultSet(RDFConnection connection, String builder){
        ResultSet safeCopy =
                Txn.calculateRead(connection, ()-> {
                    QueryExecution execution = connection.query(builder);
                    ResultSet result = ResultSetFactory.copyResults(execution.execSelect());
                    execution.close();
                    return  result;
                }) ;
        return safeCopy;
    }

    public List<ClassFromWikiData> findAll(String nameOfEntity){
        String builder = WikidataQueries.findAllQuery(nameOfEntity).toString();
        ResultSet safeCopy = transactionWithReturningResultSet(Fuseki.getConnectionRecipes(), builder);
        return ClassFromWikiData.createListOfAllClass(safeCopy);
    }

    public List<InformationAboutWikiClass> findByUri(String uri){
        String builder = WikidataQueries.findByUriQuery(uri);
        ResultSet safeCopy = transactionWithReturningResultSet(Fuseki.getConnectionWikidata(),builder);
        return InformationAboutWikiClass.createDetailOfClass(safeCopy);
    }




}

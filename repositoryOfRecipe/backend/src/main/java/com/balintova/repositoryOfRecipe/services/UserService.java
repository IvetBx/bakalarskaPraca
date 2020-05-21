package com.balintova.repositoryOfRecipe.services;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.config.Ontology;
import com.balintova.repositoryOfRecipe.models.Person;
import com.balintova.repositoryOfRecipe.queries.UserQueries;
import org.apache.jena.arq.querybuilder.AskBuilder;
import org.apache.jena.arq.querybuilder.ConstructBuilder;
import org.apache.jena.arq.querybuilder.ExprFactory;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.rdfconnection.RDFConnection;
import org.apache.jena.rdfconnection.RDFConnectionFuseki;
import org.apache.jena.sparql.vocabulary.FOAF;
import org.apache.jena.vocabulary.RDF;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public Person getUserInfo(String username, String password) throws Exception {
        SelectBuilder selectBuilder = UserQueries.getUserInfoQuery(username, password);

        QueryExecution qExec = Fuseki.getConnectionUser().query(selectBuilder.build()) ;
        ResultSet rs = qExec.execSelect() ;
        Person person = new Person();
        if(rs.hasNext()){
            person.createPerson(rs.next());
        }
        if(rs.hasNext()){
            throw new Exception("More than two users found");
        }

        qExec.close();

        return person;
    }

    public boolean findUser(String username, String password){
        AskBuilder askBuilder = UserQueries.findUserAskQuery(username, password);
        return Fuseki.getConnectionUser().queryAsk(askBuilder.build()) ;
    }

    public boolean findUsername(String username){
        AskBuilder askBuilder = UserQueries.findUsernameAskQuery(username);
        return Fuseki.getConnectionUser().queryAsk(askBuilder.build()) ;
    }

    public Person addUser(Person person) throws Exception {
        if(findUsername(person.getUsername())){
            throw new Exception("Username already exist");
        }

        Resource resource = ResourceFactory.createResource (person.getUri());
        Model model = person.addAllPropertiesToModel(resource);
        Fuseki.getConnectionUser().load(model);

        return person;
    }



}

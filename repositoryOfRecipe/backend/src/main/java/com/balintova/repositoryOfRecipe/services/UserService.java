package com.balintova.repositoryOfRecipe.services;

import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.models.Person;
import com.balintova.repositoryOfRecipe.queries.UserQueries;
import org.apache.jena.arq.querybuilder.AskBuilder;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFactory;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.system.Txn;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public Person getUserInfo(String username, String password) throws Exception {
        SelectBuilder builder = UserQueries.getUserInfoQuery(username, password);

        ResultSet safeCopy =
                Txn.calculateRead(Fuseki.getConnectionUser(), ()-> {
                    QueryExecution execution = Fuseki.getConnectionUser().query(builder.build());
                    ResultSet result = ResultSetFactory.copyResults(execution.execSelect());
                    execution.close();
                    return  result;
                }) ;
        Person person = new Person();
        return person.createPerson(safeCopy);
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

        Txn.executeWrite(Fuseki.getConnectionUser(), ()->{
            Model model = person.addAllPropertiesToModel(resource);
            Fuseki.getConnectionUser().load(model);
        });

        return person;
    }



}

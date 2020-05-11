package com.balintova.repositoryOfRecipe.services;
import com.balintova.repositoryOfRecipe.config.Ontology;
import com.balintova.repositoryOfRecipe.models.Person;
import org.apache.jena.arq.querybuilder.ExprFactory;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdfconnection.RDFConnection;
import org.apache.jena.rdfconnection.RDFConnectionFuseki;
import org.apache.jena.sparql.vocabulary.FOAF;
import org.apache.jena.vocabulary.RDF;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public Person getUserInfo(String userName, String password){

        RDFConnection builder = RDFConnectionFuseki.create()
                .destination("http://localhost:3030/users")
                .build();

        ExprFactory exprFactory = new ExprFactory();

        SelectBuilder selectBuilder = new SelectBuilder()
                .addVar( "?user").addVar( "?username" ).addVar( "?password" )
                .addWhere( "?user", RDF.type, FOAF.Person)
                .addWhere( "?user", FOAF.accountName, "?username")
                .addFilter(exprFactory.sameTerm("?username", userName))
                .addWhere( "?user", Ontology.password, "?password")
                .addFilter(exprFactory.sameTerm("?password", password));

        Person person = new Person();;
        QueryExecution qExec = builder.query(selectBuilder.build()) ;
        ResultSet rs = qExec.execSelect() ;
        while(rs.hasNext()){
            QuerySolution qs = rs.next() ;
            Resource user = qs.getResource("?user");
            String usernameLit = qs.get("?username").toString();
            String passwordLit = qs.get("?password").toString();
            person.setUri(user.getURI());
            person.setUsername(usernameLit);
            person.setPassword(passwordLit);
        }
        qExec.close();
        builder.close();

        return person;
    }

}

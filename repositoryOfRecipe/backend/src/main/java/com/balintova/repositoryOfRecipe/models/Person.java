package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.sparql.vocabulary.FOAF;
import org.apache.jena.vocabulary.OWL2;
import org.apache.jena.vocabulary.RDF;

import java.util.List;
import java.util.Map;

public class Person extends ModelOfEntity{

    String username;
    String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean stopSearching(){
        if(username != null && password != null){
            return true;
        }
        return false;
    }

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object){
        if (predicate.equals(FOAF.accountName.getURI())) {
            setUsername(object.asLiteral().getString());
        } else if (predicate.equals(Ontology.password.getURI())){
            setPassword(object.asLiteral().getString());
        }
    }

    @Override
    public Model addAllPropertiesToModel(Resource resource){
        Model model = ModelFactory.createDefaultModel();
        model.add(resource, RDF.type, FOAF.Person);
        model.addLiteral(resource, FOAF.accountName, getUsername());
        String md5Hex = DigestUtils.md5Hex(getPassword());
        model.addLiteral(resource, Ontology.password, md5Hex);
        model.add(resource, RDF.type, OWL2.NamedIndividual);

        return model;
    }

    public Person createPerson (ResultSet safeCopy) throws Exception {
        if(safeCopy.hasNext()){
            QuerySolution qs = safeCopy.next();
            Resource user = qs.getResource(Constant.userVar);
            String usernameLit = qs.get(Constant.usernameVar).toString();
            setUri(user.getURI());
            setUsername(usernameLit);
        }
        if(safeCopy.hasNext()){
            throw new Exception("More than two users found");
        }
        return this;
    }

}

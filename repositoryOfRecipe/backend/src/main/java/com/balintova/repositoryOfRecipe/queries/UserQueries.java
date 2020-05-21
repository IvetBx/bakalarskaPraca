package com.balintova.repositoryOfRecipe.queries;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.arq.querybuilder.AskBuilder;
import org.apache.jena.arq.querybuilder.ExprFactory;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.sparql.vocabulary.FOAF;
import org.apache.jena.vocabulary.RDF;

public class UserQueries {

    private static ExprFactory exprFactory = new ExprFactory();
    private static String userVar = Constant.userVar;
    private static String usernameVar = Constant.usernameVar;
    private static String passwordVar = Constant.passwordVar;

    public static SelectBuilder getUserInfoQuery (String username, String password){
        SelectBuilder selectBuilder = new SelectBuilder()
                .addVar(userVar).addVar(usernameVar).addVar(passwordVar)
                .addWhere(userVar, RDF.type, FOAF.Person)
                .addWhere( userVar, FOAF.accountName, usernameVar)
                .addFilter(exprFactory.sameTerm(usernameVar, username))
                .addWhere( userVar, Ontology.password, passwordVar)
                .addFilter(exprFactory.sameTerm(passwordVar, password));
        return selectBuilder;
    }

    public static AskBuilder findUserAskQuery (String username, String password){
        AskBuilder askBuilder = new AskBuilder().addWhere(userVar, RDF.type, FOAF.Person)
                .addWhere( userVar, FOAF.accountName, usernameVar)
                .addFilter(exprFactory.sameTerm(usernameVar, username))
                .addWhere( userVar, Ontology.password, passwordVar)
                .addFilter(exprFactory.sameTerm(passwordVar, password));
        return askBuilder;
    }

    public static AskBuilder findUsernameAskQuery (String username){
        AskBuilder askBuilder = new AskBuilder().addWhere(userVar, RDF.type, FOAF.Person)
                .addWhere( userVar, FOAF.accountName, usernameVar)
                .addFilter(exprFactory.sameTerm(usernameVar, username));
        return askBuilder;
    }





}

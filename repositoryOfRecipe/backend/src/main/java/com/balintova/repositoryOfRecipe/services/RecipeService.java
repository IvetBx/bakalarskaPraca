package com.balintova.repositoryOfRecipe.controllers.services;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.models.Recipe;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.*;
import org.apache.jena.rdfconnection.RDFConnection;
import org.apache.jena.rdfconnection.RDFConnectionFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecipeService {

    public List<Recipe> findAll(){

		Query query = QueryFactory.create(
		        "PREFIX base: <http://www.st.fmph.uniba.sk/~balintova37/ontology/finalOntologyAboutRecipe.owl#>" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "" +
                "SELECT ?s ?p ?o" +
                        "WHERE" +
                        "{ ?s ?p ?o." +
                        "} "
        );

		List<Recipe> recipes = new ArrayList<>();
      /*  try ( RDFConnection connection = RDFConnectionFactory.connect(Constant.dbRecipes) ){
            connection.querySelect(query, x -> {
                connection.loadDataset(Constant.dbRecipes);
                Resource r = x.getResource("s");
                Resource p = x.getResource("p");
                Resource o = x.getResource("o");

          //      RDFNode o = x.get("o");

        //        Resource resD = x.getResource("in");
              //  Literal litD = x.getLiteral("des");

                System.out.println(r);
                System.out.println(p);
                System.out.println(o);
               // System.out.println(litD);


                //   Resource value = r.getPropertyResourceValue(Ontology.getModel().getOntProperty("<http://www.st.fmph.uniba.sk/~balintova37/ontology/finalOntologyAboutRecipe.owl#hasDescription>"));

                Recipe recipe = new Recipe();
//                recipe.setLabel(n.getLexicalForm());
                recipes.add(recipe);

            });

        }*/

        RDFConnection conn = RDFConnectionFactory.connect(Constant.dbRecipes);
        QueryExecution qExec = conn.query("SELECT DISTINCT ?s ?o { " +
                "?s a <http://www.st.fmph.uniba.sk/~balintova37/ontology/finalOntologyAboutRecipe.owl#Recipe>." +
                "?s <http://www.st.fmph.uniba.sk/~balintova37/ontology/finalOntologyAboutRecipe.owl#hasDescription> ?o" +
                "}") ;
        ResultSet rs = qExec.execSelect() ;
        while(rs.hasNext()) {
            QuerySolution qs = rs.next() ;
            Resource subject = qs.getResource("s") ;
        //    Resource subject1 = qs.getResource("p") ;
            Literal subject2 = qs.getLiteral("o") ;
            Recipe rec = new Recipe();
            rec.setHasDescription(subject2.getString());
            recipes.add(rec);
        }
        qExec.close() ;
        conn.close() ;


        return recipes;
    }

}

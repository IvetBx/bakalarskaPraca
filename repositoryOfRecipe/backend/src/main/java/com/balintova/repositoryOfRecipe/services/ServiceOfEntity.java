package com.balintova.repositoryOfRecipe.services;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.models.ModelOfEntity;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ServiceOfEntity {

    public ModelOfEntity add(ModelOfEntity entity){

        Resource resource = ResourceFactory.createResource (entity.getUri());
        Model model = entity.addAllPropertiesToModel(resource);
        Fuseki.getConnection().load(model);

        return entity;
    }

    public String delete(ModelOfEntity entity){

        Fuseki.getConnection().update(
                "" + Constant.prefixes +
                        "DELETE { ?s ?p ?o } " +
                        "WHERE " +
                        "{ " + entity.getUri() + " (<>|!<>)* ?s. " +
                        "?s ?p ?o . " +
                        "FILTER ( !strstarts(str(?s), \"" + Constant.wikidata + "\") ) " +
                        "}");

        return entity.getUri();
    }

    public Map<Resource, Map<Resource, List<RDFNode>>> checkMap(Map<Resource, Map<Resource, List<RDFNode>>> result, Resource subject, Resource predicate, RDFNode object){
        if(result.containsKey(subject)){

            Map<Resource, List<RDFNode>> predicates = result.get(subject);

            if(predicates.containsKey(predicate)){
                List<RDFNode> objects = predicates.get(predicate);
                objects.add(object);
                predicates.replace(predicate, objects);
            }
            else{
                List<RDFNode> objects = new ArrayList<>();
                objects.add(object);
                predicates.put(predicate, objects);
            }

            result.replace(subject, predicates);
        }
        else{
            List<RDFNode> objects = new ArrayList<>();
            objects.add(object);
            Map<Resource, List<RDFNode>> predicates = new HashMap<>();
            predicates.put(predicate, objects);
            result.put(subject, predicates);
        }
        return result;
    }

    public ModelOfEntity findOne(ModelOfEntity entity){

        Query query = QueryFactory.create(
                "SELECT DISTINCT ?s ?p ?o " +
                        "WHERE { " +
                        String.format(Constant.formatTRIPLE_1, entity.getUri(), "(<>|!<>)*", "?s") +
                        String.format(Constant.formatTRIPLE_0, "?s", "?p", "?o") +
                        "}"
        );

        QueryExecution qExec = Fuseki.getConnection().query(query) ;
        ResultSet rs = qExec.execSelect() ;

        Map<Resource, Map<Resource, List<RDFNode>>> result = new HashMap<>();

        while(rs.hasNext()){
            QuerySolution qs = rs.next();

            Resource subject = qs.getResource("s");
            Resource predicate = qs.getResource("p");
            RDFNode object = qs.get("o");

            result = checkMap(result, subject, predicate, object);
        }

        Resource resource = ResourceFactory.createResource(entity.getUri());
        entity.setProperty(result, resource);

        qExec.close() ;

        return entity;
    }

    public ModelOfEntity update(ModelOfEntity oldEntity, ModelOfEntity newEntity){
        delete(oldEntity);
        add(newEntity);
        return newEntity;
    }

}

package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.vocabulary.RDF;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Sequence extends ModelOfEntity {

    List<Object> li = new ArrayList<>();                        //Recipe or Instruction

    public List<Object> getLi() {
        return li;
    }

    public void setLi(List<Object> li) {
        this.li = li;
    }

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object){

        if(predicate.equals(Ontology.li.getURI())){
            Instruction instruction = new Instruction();
            instruction.setProperty(result, object.asResource());;
            li.add(instruction);
        }
    }

    @Override
    public org.apache.jena.rdf.model.Model addAllPropertiesToModel(Resource resource){
        org.apache.jena.rdf.model.Model model = ModelFactory.createDefaultModel();

        model.add(resource, RDF.type, RDF.Seq);
        for(Object instruction : getLi()){
            Instruction instruction1 = (Instruction)instruction;
            Resource object = ResourceFactory.createResource (instruction1.getUri());
            model.addLiteral(resource, Ontology.li, object);
            model.add(instruction1.addAllPropertiesToModel(object));
        }

        return model;
    }
}

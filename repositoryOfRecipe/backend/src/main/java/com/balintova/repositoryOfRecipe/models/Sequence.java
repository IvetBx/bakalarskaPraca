package com.balintova.repositoryOfRecipe.models;

import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Sequence extends ModelOfEntity {

    List<Instruction> li = new ArrayList<>();

    public List<Instruction> getLi() {
        return li;
    }

    public void setLi(List<Instruction> li) {
        this.li = li;
    }

    public List<Instruction> helpingList = new ArrayList<>();

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object){
        if(!predicate.equals(RDF.type.getURI())){
            Instruction instruction = new Instruction();
            instruction.setProperty(result, object.asResource());
            String[] split = predicate.split("#_");
            Integer number = Integer.parseInt(split[split.length - 1]);
            helpingList.set(number, instruction);
            setLi(helpingList);
        }
    }

    @Override
    public Model addAllPropertiesToModel(Resource resource){
        Model model = ModelFactory.createDefaultModel();
        model.add(resource, RDF.type, RDF.Seq);
        for(int i = 0; i < getLi().size(); i++){
            Instruction instruction1 = getLi().get(i);
            Resource object = ResourceFactory.createResource (instruction1.getUri());
            model.addLiteral(resource, RDF.li(i), object);
            model.add(instruction1.addAllPropertiesToModel(object));
        }

        return model;
    }
}

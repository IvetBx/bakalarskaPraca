package com.balintova.repositoryOfRecipe.models;

import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Ontology;
import org.apache.jena.datatypes.xsd.XSDDatatype;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.QuerySolutionMap;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Recipe extends ModelOfEntity{

    String label;
    ClassFromWikiData produces;
    Sequence hasInstructions;
    Person hasAuthor;
    List<Ingredient> hasIngredient = new ArrayList<>();
    //XSDDuration hasCookTime;
    com.balintova.repositoryOfRecipe.models.XSDDuration hasCookTime;
    Integer hasNumberOfPortions;
    List<String> belongsToCategory = new ArrayList<>();
    List<ClassFromWikiData> belongsToCuisine = new ArrayList<>();
    String hasDescription;
    List<ClassFromWikiData> requiresEquipment = new ArrayList<>();
    List<ClassFromWikiData> usingMethod = new ArrayList<>();                  //cookingMethod


    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public ClassFromWikiData getProduces() {
        return produces;
    }

    public void setProduces(ClassFromWikiData produces) {
        this.produces = produces;
    }

    public Sequence getHasInstructions() {
        return hasInstructions;
    }

    public void setHasInstructions(Sequence hasInstructions) {
        this.hasInstructions = hasInstructions;
    }

    public List<Ingredient> getHasIngredient() {
        return hasIngredient;
    }

    public void setHasIngredient(List<Ingredient> hasIngredient) {
        this.hasIngredient = hasIngredient;
    }

    public com.balintova.repositoryOfRecipe.models.XSDDuration getHasCookTime() {
        return hasCookTime;
    }

    public void setHasCookTime(com.balintova.repositoryOfRecipe.models.XSDDuration hasCookTime) {
        this.hasCookTime = hasCookTime;
    }

    public Integer getHasNumberOfPortions() {
        return hasNumberOfPortions;
    }

    public void setHasNumberOfPortions(Integer hasNumberOfPortions) {
        this.hasNumberOfPortions = hasNumberOfPortions;
    }

    public List<String> getBelongsToCategory() {
        return belongsToCategory;
    }

    public void setBelongsToCategory(List<String> belongsToCategory) {
        this.belongsToCategory = belongsToCategory;
    }

    public List<ClassFromWikiData> getBelongsToCuisine() {
        return belongsToCuisine;
    }

    public void setBelongsToCuisine(List<ClassFromWikiData> belongsToCuisine) {
        this.belongsToCuisine = belongsToCuisine;
    }

    public String getHasDescription() {
        return hasDescription;
    }

    public void setHasDescription(String hasDescription) {
        this.hasDescription = hasDescription;
    }

    public List<ClassFromWikiData> getRequiresEquipment() {
        return requiresEquipment;
    }

    public void setRequiresEquipment(List<ClassFromWikiData> requiresEquipment) {
        this.requiresEquipment = requiresEquipment;
    }

    public Person getHasAuthor() {
        return hasAuthor;
    }

    public void setHasAuthor(Person hasAuthor) {
        this.hasAuthor = hasAuthor;
    }

    public List<ClassFromWikiData> getUsingMethod() {
        return usingMethod;
    }

    public void setUsingMethod(List<ClassFromWikiData> usingMethod) {
        this.usingMethod = usingMethod;
    }

    @Override
    public void checkPredicate(Map<Resource, Map<Resource, List<RDFNode>>> result, String predicate, RDFNode object) {

        if (predicate.equals(RDFS.label.getURI())) {
            setLabel(object.asLiteral().getString());

        } else if (predicate.equals(Ontology.hasNumberOfPortions.getURI())) {
            setHasNumberOfPortions(object.asLiteral().getInt());

        } else if (predicate.equals(Ontology.hasCookTime.getURI())) {
            //setHasCookTime((XSDDuration)object.asLiteral().getValue());
            org.apache.jena.datatypes.xsd.XSDDuration xsdDuration1 = (org.apache.jena.datatypes.xsd.XSDDuration) object.asLiteral().getValue();
            XSDDuration xsdDuration = new XSDDuration();
            xsdDuration.setMinutes(xsdDuration1.getMinutes());
            xsdDuration.setHours(xsdDuration1.getHours());
            setHasCookTime(xsdDuration);

        } else if (predicate.equals(Ontology.hasDescription.getURI())) {
            setHasDescription(object.asLiteral().getString());

        } else if (predicate.equals(Ontology.produces.getURI())) {
            ClassFromWikiData food = new ClassFromWikiData();
            food.setProperty(result, object.asResource());
            setProduces(food);

        } else if (predicate.equals(Ontology.requiresEquipment.getURI())) {
            ClassFromWikiData equipment = new ClassFromWikiData();
            equipment.setProperty(result, object.asResource());
            requiresEquipment.add(equipment);

        } else if (predicate.equals(Ontology.belongsToCuisine.getURI())) {
            ClassFromWikiData cuisine = new ClassFromWikiData();
            cuisine.setProperty(result, object.asResource());
            belongsToCuisine.add(cuisine);

        } else if (predicate.equals(Ontology.belongsToCategory.getURI())) {
            belongsToCategory.add(object.asLiteral().getString());

        } else if (predicate.equals(Ontology.hasIngredient.getURI())) {
            Ingredient ingredient = new Ingredient();
            ingredient.setProperty(result, object.asResource());
            hasIngredient.add(ingredient);

        } else if (predicate.equals(Ontology.hasInstruction.getURI())) {
            Sequence sequence = new Sequence();
            sequence.setProperty(result, object.asResource());
            setHasInstructions(sequence);
        }
    }

    @Override
    public Model addAllPropertiesToModel(Resource resource){
        Model model = ModelFactory.createDefaultModel();
        System.out.println("RR");
        model.add(resource, RDF.type, Ontology.recipeClass);

        if (getLabel() !=null && !getLabel().isEmpty()) model.add(resource, RDFS.label, getLabel());

        if (getHasNumberOfPortions() !=null) model.addLiteral(resource, Ontology.hasNumberOfPortions, getHasNumberOfPortions());

        if (getHasCookTime() !=null && (getHasCookTime().hours != 0 || getHasCookTime().minutes != 0)) {
            String duration = "PT" + getHasCookTime().hours + "H" + getHasCookTime().minutes + "M";
            org.apache.jena.datatypes.xsd.XSDDuration xsdDuration =
            (org.apache.jena.datatypes.xsd.XSDDuration) ResourceFactory.createTypedLiteral(duration, XSDDatatype.XSDduration).getValue();
            model.addLiteral(resource, Ontology.hasCookTime, xsdDuration);
        }

        if (getHasDescription() !=null && !getHasDescription().isEmpty()) model.addLiteral(resource, Ontology.hasDescription, getHasDescription());

        if (getHasAuthor() !=null) {
            Resource person = ResourceFactory.createResource (getHasAuthor().getUri());
            model.add(resource, Ontology.hasAuthor, person);
        };

        for (String category : getBelongsToCategory()){
            model.addLiteral(resource, Ontology.belongsToCategory, category);
        }

        ClassFromWikiData food = getProduces();
        if(getProduces() != null && food.getLabel() != null && !food.getLabel().isEmpty()){
            Resource object = ResourceFactory.createResource (food.getUri());
            model.addLiteral(resource, Ontology.produces, object);
            model.add(food.addAllPropertiesToModel(object));
        }

        Sequence instructions = getHasInstructions();
        if(getHasInstructions() != null && getHasInstructions().getLi() != null && getHasInstructions().getLi().size() > 1){
            Resource object2 = ResourceFactory.createResource (instructions.getUri());
            model.addLiteral(resource, Ontology.hasInstruction, object2);
            model.add(instructions.addAllPropertiesToModel(object2));
        }

        for(ClassFromWikiData cuisine : getBelongsToCuisine()){
            if(!cuisine.getUri().isEmpty()){
                Resource object3 = ResourceFactory.createResource (cuisine.getUri());
                model.addLiteral(resource, Ontology.belongsToCuisine, object3);
            }
        }

        for(ClassFromWikiData equipment : getRequiresEquipment()){
            if(!equipment.getUri().isEmpty()){
                Resource object4 = ResourceFactory.createResource (equipment.getUri());
                model.addLiteral(resource, Ontology.requiresEquipment, object4);
            }
        }

        for(Ingredient ingredient : getHasIngredient()){
            if(!ingredient.getUri().isEmpty()){
                Resource object5 = ResourceFactory.createResource (ingredient.getUri());
                model.addLiteral(resource, Ontology.hasIngredient, object5);
            }
        }

        return model;
    }

    public static Recipe createBasicRecipe(QuerySolution qs, String recipeVar, String descriptionVar, String labelVar){
        Resource recipe = qs.getResource(recipeVar);
        Literal desc = qs.getLiteral(descriptionVar);
        Literal lab = qs.getLiteral(labelVar);

        Recipe recipe1 = new Recipe();
        recipe1.setUri(recipe.getURI());
        recipe1.setLabel(lab.getString());
        recipe1.setHasDescription(desc.getString());
        return recipe1;
    }

    public static List<Recipe> createListOfBasicRecipesFromResultSet(ResultSet rs){
        List<Recipe> recipes = new ArrayList<>();
        while(rs.hasNext()) {
            recipes.add(createBasicRecipe(rs.next(), Constant.recipeVar, Constant.descriptionVar, Constant.labelVar));
        }
        return recipes;
    }

    private Map<Resource, Map<Resource, List<RDFNode>>> addTripleToMap(Map<Resource, Map<Resource, List<RDFNode>>> result, QuerySolution qs){
        Resource subject = qs.getResource(Constant.sVar);
        Resource predicate = qs.getResource(Constant.pVar);
        RDFNode object = qs.get(Constant.oVar);

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

    public Recipe createDetailOfRecipeFromResultSet(ResultSet rs, String uri1){
        Map<Resource, Map<Resource, List<RDFNode>>> result = new HashMap<>();
        while(rs.hasNext()){
            QuerySolution qs = rs.next();
            addTripleToMap(result, qs);
        }
        Resource resource = ResourceFactory.createResource(uri1);
        setProperty(result, resource);
        return this;
    }


}

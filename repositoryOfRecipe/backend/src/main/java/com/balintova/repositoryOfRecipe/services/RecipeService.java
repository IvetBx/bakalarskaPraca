package com.balintova.repositoryOfRecipe.services;
import com.balintova.repositoryOfRecipe.config.Constant;
import com.balintova.repositoryOfRecipe.config.Fuseki;
import com.balintova.repositoryOfRecipe.config.Ontology;
import com.balintova.repositoryOfRecipe.models.ModelOfEntity;
import com.balintova.repositoryOfRecipe.models.Recipe;
import org.apache.jena.arq.querybuilder.ExprFactory;
import org.apache.jena.arq.querybuilder.SelectBuilder;
import org.apache.jena.arq.querybuilder.WhereBuilder;
import org.apache.jena.datatypes.xsd.XSDDatatype;
import org.apache.jena.datatypes.xsd.XSDDuration;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.*;
import org.apache.jena.sparql.expr.*;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;
import org.springframework.stereotype.Service;

import java.util.*;
import java.text.SimpleDateFormat;

@Service
public class RecipeService extends ServiceOfEntity{

    private SelectBuilder createBasicBuilderForDislayAllRecipes(){
        SelectBuilder builder = new SelectBuilder()
                .addPrefix( "rdfs",  Constant.rdfs )
                .addPrefix( "", Constant.ontRecipes )
                .setDistinct(true)
                .addVar( "?recipe").addVar( "?desc" ).addVar( "?lab" )
                .addWhere( "?recipe", RDF.type, ":Recipe" )
                .addWhere( "?recipe", ":hasDescription", "?desc")
                .addWhere( "?recipe", RDFS.label, "?lab");
        return builder;
    }

    public static void time() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        System.out.println( sdf.format(cal.getTime()) );
    }

    private Recipe createBasicRecipe(QuerySolution qs){
        Resource recipe = qs.getResource("recipe");
        Literal desc = qs.getLiteral("desc");
        Literal lab = qs.getLiteral("lab");

        Recipe recipe1 = new Recipe();
        recipe1.setUri(recipe.getURI());
        recipe1.setLabel(lab.getString());
        recipe1.setHasDescription(desc.getString());
        return recipe1;
    }

    public List<Recipe> findAll(){

        SelectBuilder builder = createBasicBuilderForDislayAllRecipes();

		List<Recipe> recipes = new ArrayList<>();

		QueryExecution qExec = Fuseki.getConnection().query(builder.build()) ;
        ResultSet rs = qExec.execSelect() ;
        while(rs.hasNext()) {
            recipes.add(createBasicRecipe(rs.next()));
        }
        qExec.close() ;
        return recipes;
    }

    public List<Recipe> findByName(String recipeName){

        ExprFactory exprFactory = new ExprFactory();
        SelectBuilder builder = createBasicBuilderForDislayAllRecipes();
                builder.addFilter(exprFactory.regex("?lab", recipeName,"i"));

        List<Recipe> recipes = new ArrayList<>();

        QueryExecution qExec = Fuseki.getConnection().query(builder.build()) ;
        ResultSet rs = qExec.execSelect() ;
        while(rs.hasNext()) {
            recipes.add(createBasicRecipe(rs.next()));
        }
        qExec.close() ;

        return recipes;
    }

    private E_LogicalOr createFilterWithRegex(List<String> elements, Property property) {
        ExprFactory exprFactory = new ExprFactory();

        E_LogicalOr oldRegex = null;
        if(elements != null){
            for (int i = 0; i < elements.size(); i++ ){
                E_Regex newRegex = exprFactory.regex("?objectLab" + property.getLocalName(), elements.get(i), "i");
                if(i == 0) {
                    E_LogicalNot bound = exprFactory.not(exprFactory.bound("?objectLab" + property.getLocalName()));
                    oldRegex = exprFactory.or(bound, newRegex);
                } else {
                    oldRegex = exprFactory.or(oldRegex, newRegex);
                }
            }
        }
        return oldRegex;
    }

    private SelectBuilder createElementOfSubQuery(List<String> filter, SelectBuilder builder, Property property) {
        if(filter != null && filter.size() != 0){
            builder.addOptional(new WhereBuilder().addPrefix(":", Constant.ontRecipes).addWhere("?recipe", ":" + property.getLocalName(), "?object" + property.getLocalName())
                    .addWhere("?object" + property.getLocalName(), RDFS.label, "?objectLab" + property.getLocalName()));

            E_LogicalOr allRegex = createFilterWithRegex(filter, property);
            if(allRegex != null) builder.addFilter(allRegex);
        }
        return builder;
    }

    private SelectBuilder createElementOfSubQuery1(List<String> filter, Property property) {
        if(filter != null && filter.size() != 0){
            SelectBuilder builder = new SelectBuilder().addOptional(new WhereBuilder().addPrefix(":", Constant.ontRecipes).addWhere("?recipe", ":" + property.getLocalName(), "?object" + property.getLocalName())
                    .addWhere("?object" + property.getLocalName(), RDFS.label, "?objectLab" + property.getLocalName()));

            E_LogicalOr allRegex = createFilterWithRegex(filter, property);
            if(allRegex != null) builder.addFilter(allRegex);
            return builder;
        }
        return null;
    }

    public List<Recipe> findByFilterFromUser(List<String> inA, List<String> exA,
                                             List<String> inCa, List<String> exCa,
                                             List<String> inCM, List<String> exCM,
                                             List<String> inCu, List<String> exCu,
                                             List<String> inK, List<String> exK,
                                             List<String> inI, List<String> exI,
                                             String minTime, String maxTime, Double minRating, Double maxRating){

        ExprFactory exprFactory = new ExprFactory();

        SelectBuilder firstSubQuery = createBasicBuilderForDislayAllRecipes();
        firstSubQuery = createElementOfSubQuery(inI, firstSubQuery, Ontology.hasIngredient);
        firstSubQuery = createElementOfSubQuery(inCu, firstSubQuery, Ontology.belongsToCuisine);
        firstSubQuery = createElementOfSubQuery(inA, firstSubQuery, Ontology.hasAuthor);
        firstSubQuery = createElementOfSubQuery(inCa, firstSubQuery, Ontology.belongsToCategory);
        firstSubQuery = createElementOfSubQuery(inCM, firstSubQuery, Ontology.usingMethod);
        firstSubQuery = createElementOfSubQuery(inK, firstSubQuery, Ontology.requiresEquipment);

        SelectBuilder secondSubQuery = new SelectBuilder();
            if(exI.size() != 0) secondSubQuery.addUnion(createElementOfSubQuery1(exI, Ontology.hasIngredient));
            if(exCu.size() != 0) secondSubQuery.addUnion(createElementOfSubQuery1(exCu, Ontology.belongsToCuisine));
            if(exA.size() != 0) secondSubQuery.addUnion(createElementOfSubQuery1(exA, Ontology.hasAuthor));
            if(exCa.size() != 0) secondSubQuery.addUnion(createElementOfSubQuery1(exCa,  Ontology.belongsToCategory));
            if(exCM.size() != 0) secondSubQuery.addUnion(createElementOfSubQuery1(exCM,  Ontology.usingMethod));
            if(exK.size() != 0) secondSubQuery.addUnion(createElementOfSubQuery1(exK,  Ontology.requiresEquipment));
            if(minRating > 1 || maxRating < 5){
                secondSubQuery.addUnion(new SelectBuilder().addOptional(new WhereBuilder().addPrefix(":", Constant.ontRecipes).addWhere("?recipe", ":" + Ontology.hasRating.getLocalName(), "?object" + Ontology.hasRating.getLocalName()))
                        .addFilter(exprFactory.or(exprFactory.lt("?object" + Ontology.hasRating.getLocalName(), minRating), exprFactory.gt("?object" + Ontology.hasRating.getLocalName(), maxRating))));
            }

            if(!minTime.isEmpty() && !maxTime.isEmpty()){
                XSDDuration minTimeDur = (XSDDuration)ResourceFactory.createTypedLiteral("PT" + minTime + "M", XSDDatatype.XSDduration).getValue();
                XSDDuration maxTimeDur = (XSDDuration)ResourceFactory.createTypedLiteral("PT" + maxTime + "M", XSDDatatype.XSDduration).getValue();
                secondSubQuery.addUnion(new SelectBuilder().addOptional(new WhereBuilder().addPrefix(":", Constant.ontRecipes).addWhere("?recipe", ":" + Ontology.hasCookTime.getLocalName(), "?object" + Ontology.hasCookTime.getLocalName()))
                        .addFilter(exprFactory.or(exprFactory.lt("?object" + Ontology.hasCookTime.getLocalName(), minTimeDur), exprFactory.gt("?object" + Ontology.hasCookTime.getLocalName(), maxTimeDur))));
            } else if(!minTime.isEmpty()){
                XSDDuration minTimeDur = (XSDDuration)ResourceFactory.createTypedLiteral("PT" + minTime + "M", XSDDatatype.XSDduration).getValue();
                secondSubQuery.addUnion(new SelectBuilder().addOptional(new WhereBuilder().addPrefix(":", Constant.ontRecipes).addWhere("?recipe", ":" + Ontology.hasCookTime.getLocalName(), "?object" + Ontology.hasCookTime.getLocalName()))
                        .addFilter(exprFactory.lt("?object" + Ontology.hasCookTime.getLocalName(), minTimeDur)));

            } else if(!maxTime.isEmpty()){
                XSDDuration maxTimeDur = (XSDDuration)ResourceFactory.createTypedLiteral("PT" + maxTime + "M", XSDDatatype.XSDduration).getValue();
                secondSubQuery.addUnion(new SelectBuilder().addOptional(new WhereBuilder().addPrefix(":", Constant.ontRecipes).addWhere("?recipe", ":" + Ontology.hasCookTime.getLocalName(), "?object" + Ontology.hasCookTime.getLocalName()))
                        .addFilter(exprFactory.gt("?object" + Ontology.hasCookTime.getLocalName(), maxTimeDur)));
            }

        SelectBuilder builder = new SelectBuilder();
        builder.addPrefix( "rdfs",  Constant.rdfs )
                .addPrefix( "", Constant.ontRecipes )
                .setDistinct(true)
                .addVar( "?recipe").addVar( "?desc" ).addVar( "?lab" )
                .addSubQuery(firstSubQuery);
        if(secondSubQuery != null) builder.addMinus(secondSubQuery);

        System.out.println(builder);

        List<Recipe> recipes = new ArrayList<>();

        QueryExecution qExec = Fuseki.getConnection().query(builder.build()) ;
        ResultSet rs = qExec.execSelect() ;
        while(rs.hasNext()) {
            recipes.add(createBasicRecipe(rs.next()));
        }
        qExec.close() ;
        return recipes;
    }

    public Recipe findOne(String uri){

        String creatingUri =  Constant.dbRecipesPref + uri;

        SelectBuilder builder = new SelectBuilder()
                .addPrefix( "rdfs",  Constant.rdfs )
                .addPrefix( "", Constant.ontRecipes )
                .setDistinct(true)
                .addVar( "?s").addVar( "?p" ).addVar( "?o" )
                .addWhere( "<" + creatingUri + ">","(<>|!<>)*", "?s" )
                .addWhere( "?s", "?p", "?o");

        Query query = builder.build() ;

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

        Recipe recipe = new Recipe();
        Resource resource = ResourceFactory.createResource(creatingUri);
        recipe.setProperty(result, resource);

        qExec.close() ;

        return recipe;
    }









}

import React, {Component} from 'react';
import {Row, Col, Container, Nav, Card} from "react-bootstrap";
import { connect } from "react-redux"
import {urlLabel, urlOntology, urlMember} from "../../config/Constant"
import { fetchDetailAboutRecipe, fetchSimilarRecipes } from "../../redux/Index"
import {loading, displayError} from "./commonComponents"

const classNameTitles = "text-info p-0 font-weight-bold"
const classNameListEntity = "text-dark font-weight-bold d-flex float-left ml-4"
const classNameEntity = "text-dark font-weight-bold ml-4"
const classNameCardHeader = "text-muted p-0 font-weight-bold"

function getListOfCategories (categories) {
    return (
        categories.length ? 
        <Col>
        <Nav.Link className="p-0" href={`${urlOntology}belongsToCategory`}> <h5 className={classNameTitles}>Categories:</h5></Nav.Link>
        {categories.map((category) => <h5 className={classNameListEntity} key={Math.random()}>{category}</h5>)}
        </Col>
        :  null
    )
}

function getListOfWikidataEntities(list, title, propertyName) {
    return(
     list.length ? 
        <Col>
        <Nav.Link className="p-0" href={`${urlOntology}${propertyName}`}><h5 className={classNameTitles}>{title}:</h5> </Nav.Link>
        {list.map((entity) => 
        <Nav.Link className="p-0" href={`${entity.uri}`} key={entity.uri}><h5 className={classNameListEntity}>{entity.label}</h5></Nav.Link>
        )}
        </Col>
        :  null
    )
}

function getTime(cookTime){
    return (
        cookTime && cookTime.hours && cookTime.minutes ? 
            <Col>
                <Nav.Link  className="p-0" href={`${urlOntology}hasCookTime`}><h5 className={classNameTitles}>Cooking time:</h5> </Nav.Link>
                <h5 className={classNameEntity}>{cookTime.hours}h. {cookTime.minutes} min.</h5>
            </Col>
        : cookTime && cookTime.hours ?
            <Col>
                <Nav.Link  className="p-0" href={`${urlOntology}hasCookTime`}><h5 className={classNameTitles}>Cooking time:</h5> </Nav.Link>
                <h5 className={classNameEntity}>{cookTime.hours}h.</h5>
            </Col>
        : cookTime && cookTime.minutes?
            <Col>
                <Nav.Link  className="p-0" href={`${urlOntology}hasCookTime`}><h5 className={classNameTitles}>Cooking time:</h5> </Nav.Link>
                <h5 className={classNameEntity}>{cookTime.minutes} min.</h5>
            </Col>
        : null
    )
}

function getSimplePropertyWithValue(value, title, propertyName){
    return (
         value ? 
            <Col>
                <Nav.Link className="p-0" href={`${urlOntology}${propertyName}`}><h5 className={classNameTitles}>{title}:</h5> </Nav.Link>
                <h5 className={classNameEntity}>{value}</h5>
            </Col> 
        :  null
    )
}

function getAuthor(author){
    return(
        author ? 
            <Col>
                <Nav.Link className="p-0" href={`${urlOntology}hasAuthor`}><h5 className={classNameTitles}>Author:</h5> </Nav.Link>
                <h5 className={classNameEntity}>{author}</h5>
            </Col>
        :  null
    )
}

function getProduces(produces){
    return(
        produces ?
        <div>
            <Nav.Link  className="p-0" href={`${urlOntology}produces`}><h5 className={classNameTitles}>Produces food:</h5> </Nav.Link>
            <Nav.Link  className="p-0" href={`${produces.uri}`}><h5 className={classNameEntity}>{produces.label}</h5></Nav.Link>
        </div>
        : null
    )
}

function createCardOfBasicInformation(produces, description, cookTime, portions, author, categories, cuisines, equipment) {
    return(
    <Card bg="light" className="mt-3">
    <Card.Header><h5 className={classNameCardHeader}>Basic information about recipe</h5></Card.Header>
        <Card.Body>
            {getProduces(produces)}
            <Nav.Link  className="p-0 mt-3" href={`${urlOntology}hasDescription`}><h5 className={classNameTitles}>Description:</h5> </Nav.Link>
            <h5 className={classNameEntity}>{description}</h5>

            <Row className="mt-4">
                {getTime(cookTime)}
                {getSimplePropertyWithValue(portions, "Portions", "hasNumberOfPortion")}
                {getAuthor(author)}
            </Row>

            <Row className="mt-4"> 
                {getListOfCategories(categories)}
                {getListOfWikidataEntities(cuisines, "Cuisines", "belongsToCuisine")}
            </Row>

            <Row className="mt-4"> {getListOfWikidataEntities(equipment, "Kitchenware", "requiresEquipment")} </Row>
        </Card.Body>
    </Card>
    )
}

function getListOfIngredients(ingredients){
    return(
        <Col>
        <Nav.Link className="p-0" href={`${urlOntology}hasIngredient`}><h5 className={classNameTitles}>List of ingredients:</h5> </Nav.Link>
        {ingredients.map((ing) =>  
            <Col key={ing.uri}>
                <Nav.Link  className="p-0 mt-3" href={ing.hasFood ? ing.hasFood.uri : ""}><h5 className={classNameEntity}>{ing.hasQuantity ? ing.hasQuantity.hasCount : ""} {ing.hasQuantity ? ing.hasQuantity.hasMetricQuantity : ""} {ing.label}</h5></Nav.Link>
            </Col>                     
        )}
        </Col>
    )
}

function createCardOfIngredients(ingredients) {
    return(
    <Card bg="light" className="mt-3">
    <Card.Header><h5 className={classNameCardHeader}>Ingredient list</h5></Card.Header>
        <Card.Body>
            <Row>
                {getListOfIngredients(ingredients)}
            </Row>
        </Card.Body>
    </Card>
    )
}

function createCardOfSimilarRecipes(similarRecipes) {
    return(
    <Card bg="light" className="mb-5 mt-3">
    <Card.Header><h5 className={classNameCardHeader}>Similar Recipes</h5></Card.Header>
        <Card.Body>
            {similarRecipes.map((recipe, index) => {
                var split = recipe.uri.split("#")
                var recipeURLinPage = split[split.length - 1]
                return(
                    <Row key={index}>
                        <Nav.Link  className="ml-5 p-0" href={recipeURLinPage}><h4 className={classNameTitles}>{recipe.label}</h4></Nav.Link>   
                    </Row>
                )
            })}
        </Card.Body>
    </Card>
    )
}

function getListOfSubstep(array){
    return(
        <div>
            <Nav.Link className="p-0" href={urlMember}><h5 className={classNameTitles}>Cooking substeps:</h5></Nav.Link>
            {array.map((entity, index) => 
            <Row key={index}>
                <Col className="col-1"><Nav.Link className="p-0" href={urlMember} key={entity.uri}><h5 className={classNameTitles}>{index+1}:</h5></Nav.Link></Col>
                <Col><h5 className={classNameListEntity}>{entity.hasDescription}</h5></Col>
            </Row>
            )}
        </div>
    )
}

function createSimpleStep(step){
    return(
        <div>
            {step.hasDescription ? <Row>{getSimplePropertyWithValue(step.hasDescription, "Description of step", "hasDescription")}</Row> : null}   

            {step.produces ? <Row className="mt-3">{getProduces(step.produces)}</Row> : null}
            
            <Row className="mt-3">
                {getTime(step.hasCookTime)}
                {getSimplePropertyWithValue(step.needsTemperature, "Temperature", "needsTemperature")}
                {getSimplePropertyWithValue(step.hasEndPoint, "Endpoint of step", "hasEndPoint")}
            </Row>  

            <Row className="mt-3">
                {getListOfWikidataEntities(step.usingMethod, "Cooking methods", "usingMethod")}
                {getListOfWikidataEntities(step.requiresEquipment, "Kitchenware", "requiresEquipment")}
            </Row>

            <Col>
                {step.hasInstructions && step.hasInstructions.li && getListOfSubstep(step.hasInstructions.li)}
            </Col>

            {step.hasIngredient.length ? <Row className="mt-3">{getListOfIngredients(step.hasIngredient) }</Row> : null}
        </div>
    )
}

function createCardOfStep(step, index){
    return(
        <Card bg="light" className="mt-3">
        <Card.Header><h5 className={classNameCardHeader}>{index + 1}. step</h5></Card.Header>
            <Card.Body>
                {createSimpleStep(step)}
            </Card.Body>
        </Card>
    ) 
}

function createCardOfInstructions(instructions){
    return(
        <Card bg="light" className="mt-3">
        <Card.Header><h5 className={classNameCardHeader}>Instructions list</h5></Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                    <Nav.Link className="p-0" href={`${urlOntology}hasInstructions`}><h5 className={classNameTitles}>List of instructions:</h5> </Nav.Link>
                    {instructions.map((instruction, index) =>  
                        <Col key={instruction.uri}>
                            {createCardOfStep(instruction, index)}
                        </Col>                     
                    )}
                    </Col> 
                </Row>
            </Card.Body>
        </Card>
    )
}


class Recipe extends Component {

        componentDidUpdate(){
            if(this.props.recipes.recipeDetail && this.props.recipes.recipeDetail.label && !this.similar){
                var split = this.props.recipes.recipeDetail.produces.uri.split("/")
                this.props.fetchSimilarRecipes(split[split.length - 1])
                this.similar = true
            }
        }

        componentDidMount(){
            const id = this.props.match.params.id
            this.props.fetchDetailAboutRecipe(id) 
            this.similar = false
        }

        render(){
            const cookTime = this.props.recipes.recipeDetail.hasCookTime
            const portions = this.props.recipes.recipeDetail.hasNumberOfPortions
            const author = this.props.recipes.recipeDetail.hasAnAuthor
            const categories = this.props.recipes.recipeDetail.belongsToCategory
            const cuisines = this.props.recipes.recipeDetail.belongsToCuisine
            const produces = this.props.recipes.recipeDetail.produces
            const description = this.props.recipes.recipeDetail.hasDescription
            const equipment = this.props.recipes.recipeDetail.requiresEquipment
            const ingredients = this.props.recipes.recipeDetail.hasIngredient
            const instructions = this.props.recipes.recipeDetail.hasInstructions.li
            const uri = this.props.recipes.recipeDetail.uri
            const label = this.props.recipes.recipeDetail.label
            const similarRecipes = this.props.recipes.similarRecipes
            return(
                <Container>
                    { loading(this.props.recipes.loading) }
                    { displayError(this.props.recipes.error, this.props.recipes.error) }
                    <Nav.Link className="p-0 m-0" href={uri}><h1 className="mt-3 d-flex justify-content-center font-weight-bold text-success">{label}</h1></Nav.Link>
                    <Nav.Link  className="d-flex justify-content-center p-0" href={urlLabel}><h4 className={classNameTitles}>(label)</h4></Nav.Link>   
                    {createCardOfBasicInformation(produces, description, cookTime, portions, author, categories, cuisines, equipment)}
                    {createCardOfIngredients(ingredients)}
                    {createCardOfInstructions(instructions)}
                    {createCardOfSimilarRecipes(similarRecipes)}
                </Container>
            )
        }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailAboutRecipe: (id) => dispatch(fetchDetailAboutRecipe(id)),
        fetchSimilarRecipes: (id) => dispatch(fetchSimilarRecipes(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
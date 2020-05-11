import React from 'react';
import {Row, Col, Container, Nav, Card} from "react-bootstrap";
import { connect } from "react-redux"

const classNameTitles = "text-info p-0 font-weight-bold"
const classNameListEntity = "text-dark font-weight-bold d-flex float-left ml-4"
const classNameEntity = "text-dark font-weight-bold ml-4"
const classNameCardHeader = "text-muted p-0 font-weight-bold"
const urlOntology = "http://www.st.fmph.uniba.sk/~balintova37/ontology/finalOntologyAboutRecipe.owl#"
const urlLabel = "https://www.w3.org/2000/01/rdf-schema#label"

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
                <h5 className={classNameEntity}>{ing.hasQuantity.hasCount} {ing.hasQuantity.hasMetricQuantity} {ing.label} (source: )</h5>
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

            {step.hasIngredient.length ? <Row className="mt-3">{getListOfIngredients(step.hasIngredient) }</Row> : null}
        </div>
    )
}

function createComplexStep(step){
    return(
        <div>
            {step.map((step1, index) =>  
                <Col key={step1.uri}>
                    {createCardOfStep(step1, index)}
                </Col>                     
            )}
        {createSimpleStep(step)}
        </div>

    )
}

function createCardOfStep(step, index){
    return(
        <Card bg="light" className="mt-3">
        <Card.Header><h5 className={classNameCardHeader}>{index + 1}. step</h5></Card.Header>
            <Card.Body>
                {step.hasInstructions ?
                    createComplexStep(step, index)
                :
                    createSimpleStep(step)
                }

            </Card.Body>
        </Card>
    ) 
}

function createCardOfInstructions(instructions){
    return(
        <Card bg="light" className="mt-3 mb-5">
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


function Recipe (props) {

        const cookTime = props.detail.hasCookTime
        const portions = props.detail.hasNumberOfPortions
        const author = props.detail.hasAnAuthor
        const categories = props.detail.belongsToCategory
        const cuisines = props.detail.belongsToCuisine
        const produces = props.detail.produces
        const description = props.detail.hasDescription
        const equipment = props.detail.requiresEquipment
        const ingredients = props.detail.hasIngredient
        const instructions = props.detail.hasInstructions.li

        return(
            <Container>
                <h1 className="mt-3 d-flex justify-content-center font-weight-bold text-success">{props.detail.label}</h1>
                <Nav.Link  className="d-flex justify-content-center p-0" href={urlLabel}><h4 className={classNameTitles}>(label)</h4> </Nav.Link>   
                {createCardOfBasicInformation(produces, description, cookTime, portions, author, categories, cuisines, equipment)}
                {createCardOfIngredients(ingredients)}
                {createCardOfInstructions(instructions)}
            </Container>
        )
    
}

const mapStateToProps = state => {
    return {
        detail: state.recipes.recipeDetail
    }
}

export default connect(mapStateToProps)(Recipe)
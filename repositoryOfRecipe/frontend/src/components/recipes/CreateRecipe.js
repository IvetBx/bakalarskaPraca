import React, { Component } from 'react'
import { Col, Button, Form, Container, Row, Nav, Card } from "react-bootstrap"
import { Formik, Field, FieldArray } from "formik"
import {categories, units, structureOfRecipe, structureOfLiOfhasInstruction, structureOfhasIngredient} from "../../config/Constant"
import { connect } from "react-redux"
import { fetchWikidataList, fetchWikidata2List, fetchWikidata3List, createRecipe, setRecipeDetail } from "../../redux/Index"

const urlOntology = "http://www.st.fmph.uniba.sk/~balintova37/ontology/finalOntologyAboutRecipe.owl#"
const urlLabel = "https://www.w3.org/2000/01/rdf-schema#label"

/*
const validationSchema = yup.object({
  listEntities: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});*/

class CreateRecipe extends Component{

  constructor(props){
    super(props)
    this.state = {initVal: structureOfRecipe }
  }


  
  componentDidMount(){
      this.props.fetchWikidataList("cookingMethod")
      this.props.fetchWikidata2List("cuisine")
      this.props.fetchWikidata3List("kitchenware")
      this.props.setRecipeDetail(this.state.initVal)
    }

   createInputTextFieldWithLabel(allValues, formLabel, placeholder, name, errors, href) {
       return(
        <Col>
            <Nav.Link className="p-0 m-0" href={href}><h6 className="text-muted font-weight-bold mt-2">{formLabel}</h6></Nav.Link>
            <Field placeholder={placeholder} name={name} type="input" as={Form.Control} isInvalid={errors} />
        </Col>
       )
    }

    createTextAreaField(allValues, formLabel, placeholder, name, rows, errors, href, handleChange){
        return(
            <Col>
                <Nav.Link className="p-0 m-0" href={href}><h6 className="text-muted font-weight-bold mt-2">{formLabel}</h6></Nav.Link>
                <Form.Control as="textarea"  placeholder={placeholder} name={name} rows={rows} isInvalid={errors} onChange={e => {handleChange(e)}}/>
            </Col>
        )
    }

    createInsideElementOfArray(allValues, elem, index, placeholder, nameArray, arrayHelpers){
      return(
        <Row key={index} className="m-0">
            <Field placeholder={placeholder} name={`${nameArray}.${index}.label`} type="input" as={Form.Control} className="float-left w-75 mt-2" />                  
            <Button onClick={() => {arrayHelpers.remove(index);}} variant="danger ml-2" className="button2 float-left mt-1 mr-2"><p>x</p></Button>
        </Row> 
      )
    }

    createInputTextFieldWithoutLabel(allValues, name, placeholder, className){
        return(
          <Col className={className}>
            <Field placeholder={placeholder} name={name} type="input" as={Form.Control} />
          </Col>
        )
    }

    createSelectFieldWithSimpleArrayOfOption(allValues, name, index, value, arrayOfOption, handleChange, arrayHelpers, className){
      return(
        <Row className={`${className} m-0`} key={index}>
          <Form.Control name={name} value={value} as="select" className="float-left w-75 mt-2"
              onChange={e => {handleChange(e)}}>
              {arrayOfOption.map((elem) => {return <option value={elem} key={elem}>{elem}</option>})}
          </Form.Control>
          <Button onClick={() => {arrayHelpers.remove(index);}} variant="danger ml-2" className="button2 float-left mt-1 mr-2"><p>x</p></Button>
          </Row>
      )
    }

    createSelectFieldWithWikidataArrayOfOption(allValues, name, index, value, arrayOfOption, handleChange, arrayHelpers, className){
      return(
        <Row className={`${className} m-0`} key={index}>
          <Form.Control name={`${name}.uri`} value={value} as="select" className="float-left w-75 mt-2"
              onChange={e => {handleChange(e)}}>
              {arrayOfOption.map((elem, index2) => {return <option value={elem.uri} key={elem.uri+index2}>{elem.label}</option>})}
          </Form.Control>
          <Button onClick={() => {arrayHelpers.remove(index);}} variant="danger ml-2" className="button2 float-left mt-1 mr-2"><p>x</p></Button>
        </Row>
      )
    }

    createFieldOfIngredient(allValues, elem, index, nameArray, arrayHelpers, array, handleChange){
      return(
        <Row key={index}>
          {this.createInputTextFieldWithoutLabel(allValues, `${nameArray}.${index}.hasQuantity.hasCount`, "Enter a numeric quantity", "col-3 p-1")}
          <Col className="col-2 p-1" >
          <Form.Control name={`${nameArray}.${index}.hasQuantity.hasMetricQuantity`} value={array[index].hasQuantity.hasMetricQuantity} as="select"
              onChange={e => {handleChange(e)}}>
              {units.map((elem) => {return <option value={elem} key={elem}>{elem}</option>})}
          </Form.Control></Col>
          {this.createInputTextFieldWithoutLabel(allValues, `${nameArray}.${index}.label`, "Enter name of ingredient from food list", "col-6 p-1")}
          <Col className="col"><Button onClick={() => arrayHelpers.remove(index)} variant="danger" className="button2"><p>x</p></Button></Col>
        </Row>
      )
    }

    createFieldOfInstruction(allValues, name, index, handleChange, arrayHelpers, className, errors, values){
      return(
        <Card bg="white" text="light" className="mb-3" key={index}>
        <Card.Body>
        <Row>
          {this.createTextAreaField(allValues, "Description of step:", "In this step you should...", `${name}.hasDescription`, "6", !!errors, urlOntology + "hasDescription", handleChange)}
          {this.createTextAreaField(allValues, "State in which step ends:", "Enter state in which step ends...", `${name}.hasEndPoint`, "6", !!errors.hasEndPoint, urlOntology+"hasEndPoint", handleChange)}
        </Row>
        <Row>
        {this.createArrayField(allValues, "Cooking methods:", `${name}.usingMethod`, values.usingMethod, "", !!errors.usingMethod, urlOntology + "usingMethod", handleChange)}
          {this.createArrayField(allValues, "Kitchenware:", `${name}.requiresEquipment`, values.requiresEquipment, "Enter name of kitchenware from kitchenware list", !!errors.requiresEquipment, urlOntology + "requiresEquipment", handleChange)}
          {this.createInputTextFieldWithLabel(allValues, "Produces food:", "Enter name of food from food list", `${name}.produces.label`, !!errors.produces, urlOntology+"produces")}
        </Row>
        <Row>
          {this.createInputTextFieldWithLabel(allValues, "Needed temperature:", "Enter needed temperature", `${name}.needsTemperature`, !!errors.needsTemperature, urlOntology+"needsTemperature")}
          {this.createInputTextFieldWithLabel(allValues, "Cooking time - number of hours:", "Enter number of hour", `${name}.hasCookTime.hours`, !!errors.hasCookTime, urlOntology + "hasCookTime")}
          {this.createInputTextFieldWithLabel(allValues, "Cooking time - number of minutes:", "Enter number of minutes", `${name}.hasCookTime.minutes`, !!errors.hasCookTime, urlOntology + "hasCookTime")}
        </Row>
        <Row>
          {this.createArrayField(allValues, "Ingredients:", `${name}.hasIngredient`, values.hasIngredient, "", !!errors.hasIngredient, urlOntology + "hasIngredient", handleChange)}
        </Row>
        <Row className="m-2 mt-3"><Button onClick={() => arrayHelpers.remove(index)} variant="danger"><h6 className="m-0 font-weight-bolder">Delete step</h6></Button></Row>
        </Card.Body>
        </Card>
      )

    }

    createInstructions(allValues, formLabel, nameArray, array, placeholder, errors, href, handleChange){
      return(
          <Row>
              {this.createArrayField(allValues, formLabel,`${nameArray}.li`, array.li, placeholder, errors, href, handleChange)}
          </Row>
      )

    }

    createArrayField(allValues, formLabel, nameArray, array, placeholder, errors, href, handleChange){
      return(
        <Col>
            <Nav.Link className="p-0 m-0" href={href}><h6 className="text-muted font-weight-bold mt-2">{formLabel}</h6></Nav.Link>
            <FieldArray name={nameArray}>
              {arrayHelpers => (
                <div>
                  {array.map((elem, index) => {
                    console.log(nameArray)
                    console.log(array[index]);
                    console.log("poku")
                    console.log(array[index].usingMethod)
                    return (
                      nameArray.endsWith("hasIngredient") ? 
                        this.createFieldOfIngredient(allValues, elem, index, nameArray, arrayHelpers, array, handleChange, errors) 
                      : nameArray.endsWith("hasInstructions.li") ? 
                        this.createFieldOfInstruction(allValues, `${nameArray}.${index}`, index, handleChange, arrayHelpers, "", errors, array[index])
                      : nameArray.endsWith("belongsToCategory") ?
                        this.createSelectFieldWithSimpleArrayOfOption(allValues, `${nameArray}.${index}`, index, array[index], categories, handleChange, arrayHelpers)
                      : nameArray.endsWith("usingMethod") ?
                        this.createSelectFieldWithWikidataArrayOfOption(allValues, `${nameArray}.${index}`, index, array[index].uri, this.props.wikidataList.wikidataList, handleChange, arrayHelpers)
                      : nameArray.endsWith("belongsToCuisine") ?
                        this.createSelectFieldWithWikidataArrayOfOption(allValues, `${nameArray}.${index}`, index, array[index].uri, this.props.wikidataList.wikidata2List, handleChange, arrayHelpers)
                      : nameArray.endsWith("requiresEquipment") ?
                        this.createSelectFieldWithWikidataArrayOfOption(allValues, `${nameArray}.${index}`, index, array[index].uri, this.props.wikidataList.wikidata3List, handleChange, arrayHelpers)
                      
                      : this.createInsideElementOfArray(allValues, elem, index, placeholder, nameArray, arrayHelpers)
                      );
                  })}
                    {nameArray.endsWith("hasIngredient") ?
                    <Button onClick={() => {arrayHelpers.push({ uri:"" + Math.random(),
                                  label: "", hasFood:{uri:"", label:""}, hasQuantity: {uri:"", hasMetricQuantity:"", hasCount:""}
                    })}} variant="success" className="button2 mt-2"><p>+</p></Button> 
                    : nameArray.endsWith("hasInstructions.li") ? 
                    <Button onClick={() => {arrayHelpers.push(structureOfLiOfhasInstruction)}} variant="success" className="mt-2"><h6 className="m-0 font-weight-bolder">Add new step</h6></Button> 
                    : nameArray.endsWith("belongsToCategory") ?
                      <Button onClick={() => {arrayHelpers.push("")}} variant="success" className="button2 mt-2"><p>+</p></Button>
                    : <Button onClick={() => {arrayHelpers.push({label:"", uri:""+Math.random()})}} variant="success" className="button2 mt-2"><p>+</p></Button>
                   }
                  </div>
              )}
            </FieldArray>
        </Col>
      )
    }

  createFormular(){
    return ( 
      <div>
        <Formik
            validateOnChange={false}
            initialValues={this.state.initVal}
           // validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values)
              this.props.createRecipe(values)
              setSubmitting(false);
            }
            }>
            {({ values, errors, isSubmitting, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <Card bg="light" className="mb-3">
                <Card.Body>
                <Row>
                    {this.createInputTextFieldWithLabel(values, "*Recipe name:", "Enter name of recipe", "label", !!errors.label, urlLabel)}
                    {this.createInputTextFieldWithLabel(values, "*Produces food:", "Enter name of food from food list", "produces.label", !!errors.produces, urlOntology+"produces")}
                </Row>

                <Row>
                    {this.createTextAreaField(values, "*Short description of recipe:", "Enter short description of recipe...", "hasDescription", "4", !!errors.hasDescription, urlOntology + "hasDescription", handleChange)}
                </Row>
                
                <Row>
                    {this.createInputTextFieldWithLabel(values, "Cooking time - number of hours:", "Enter number of hour", "hasCookTime.hours", !!errors.hasCookTime, urlOntology + "hasCookTime")}
                    {this.createInputTextFieldWithLabel(values, "Cooking time - number of minutes:", "Enter number of minutes", "hasCookTime.minutes", !!errors.hasCookTime, urlOntology + "hasCookTime")}
                    {this.createInputTextFieldWithLabel(values, "Number of portions:", "Enter number of portions", "hasNumberOfPortions", !!errors.hasNumberOfPortions, urlOntology + "hasNumberOfPortions")}
                </Row>

                <Row>
                    {this.createArrayField(values, "Cuisines:", "belongsToCuisine", values.belongsToCuisine, "Enter name of cuisine from cuisine list", !!errors.belongsToCuisine, urlOntology + "belongsToCuisine", handleChange)}
                    {this.createArrayField(values, "Kitchenware:", "requiresEquipment", values.requiresEquipment, "Enter name of kitchenware from kitchenware list", !!errors.requiresEquipment, urlOntology + "requiresEquipment", handleChange)}
                </Row>

                <Row className="mb-5">
                    {this.createArrayField(values, "Categories:", "belongsToCategory", values.belongsToCategory, "", !!errors.belongsToCategory, urlOntology + "belongsToCategory", handleChange)}
                    {this.createArrayField(values, "Cooking methods:", "usingMethod", values.usingMethod, "", !!errors.usingMethod, urlOntology + "usingMethod", handleChange)}
                </Row>
                </Card.Body>
                </Card>

                <Card bg="light" className="mb-3">
                <Card.Body>
                <h3 className="d-flex justify-content-center font-weight-bolder p-0 mb-0 text-info">Ingredient list</h3>
                <Row>
                    {this.createArrayField(values, "*Ingredients:", "hasIngredient", values.hasIngredient, "", !!errors.hasIngredient, urlOntology + "hasIngredient", handleChange)}
                </Row>
                </Card.Body>
                </Card>

                <Card bg="light" className="mb-3">
                <Card.Body>
                <h3 className="d-flex justify-content-center font-weight-bolder p-0 mb-0 text-info">Cooking instruction list</h3>
                {this.createInstructions(values, "*Cooking instructions:", "hasInstructions", values.hasInstructions, "", !!errors.hasInstructions, urlOntology + "hasInstructions", handleChange)}
                </Card.Body>
                </Card>
              <div className="d-flex justify-content-center mt-5 mb-5">
                <Button disabled={isSubmitting} type="submit" variant="success" className="button2 mt-2 w-50"><p>Save</p></Button>
              </div>

            </Form> )}
          </Formik>
        </div>
        )}

    render(){
      const localStorageUser = JSON.parse(localStorage.getItem("user"))

        return(
          !localStorageUser.username ?  
            <div>
                <h2 className="d-flex justify-content-center font-weight-bolder mt-5 mb-2 text-danger">You can't create your own recipe</h2>
                <h1 className="d-flex justify-content-center font-weight-bolder mb-2 text-info">You should log in</h1>
            </div>
          : 
            <Container>
                <h2 className="d-flex justify-content-center font-weight-bolder mt-5 mb-2 text-info">You can create your own recipe by filling out the form</h2>
                <h5 className="d-flex justify-content-center font-weight-bolder mb-5 text-muted">and enrich our repository of recipes</h5>
                {this.createFormular("recipe", true)}
            </Container>
          )
    }
}

const mapStateToProps = state => {
  return {
      wikidataList: state.wikidataList,
      recipes: state.recipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchWikidataList: (entity) => dispatch(fetchWikidataList(entity)),
      fetchWikidata2List: (entity) => dispatch(fetchWikidata2List(entity)),
      fetchWikidata3List: (entity) => dispatch(fetchWikidata3List(entity)),
      createRecipe: (recipe) => dispatch(createRecipe(recipe)),
      setRecipeDetail: (recipe) => dispatch(setRecipeDetail(recipe))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe)


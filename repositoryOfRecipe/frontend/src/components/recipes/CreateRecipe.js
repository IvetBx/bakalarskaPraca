import React, { Component } from 'react'
import { Col, Button, Form, Container, Row, Nav, Card, Alert } from "react-bootstrap"
import { Formik, Field, FieldArray } from "formik"
import {categories, units, structureOfLiOfhasInstruction, structureOfhasIngredient, structureOfWikidataEntity,
  dbRecipes } from "../../config/Constant"
import { connect } from "react-redux"
import { fetchWikidataList, fetchWikidata2List, fetchWikidata3List, createRecipe, fetchDetailAboutRecipe, updateRecipe } from "../../redux/Index"
import {urlOntology, urlLabel, urlMember} from "../../config/Constant"
import {cantDisplay, loading, displayError} from "./commonComponents"
import * as yup from "yup"

const produces = yup.object({
  label: yup.string().required("Name of food is required"),
});

const hasCookTime = yup.object({
  minutes: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").nullable(),
  hours: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").nullable(),
}).nullable();

const hasQuantity = yup.object({
  hasCount: yup.number().typeError("Must be a number").positive("Must be positive number").nullable(),
}).nullable();

const hasIngredient = yup.object({
  label: yup.string().required("Name of ingredient is required"),
  hasQuantity: hasQuantity
})

const li = yup.object({
  hasIngredient: yup.array().of(hasIngredient),
  needsTemperature: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").nullable(),
  hasCookTime:hasCookTime,
  hasDescription: yup.string().required("Description of step is required")
})

const validationSchema = yup.object({
  label: yup.string().required("Name of recipe is required"),
  hasDescription: yup.string().required("Short description is required"),
  hasNumberOfPortions: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").nullable(),
  hasCookTime:hasCookTime,
  hasIngredient: yup.array().of(hasIngredient).min(1),
  hasInstructions: yup.object({
    li: yup.array().of(li).min(1),
  }),
  produces: produces
});

class CreateRecipe extends Component{

  constructor(props){
    super(props)
    this.initVal = this.props.recipes.recipeDetail;
    this.submit = false
    this.update = false
  }

  componentDidUpdate(){
    if(!this.props.recipes.loading && !this.props.recipes.error && this.submit){
      this.props.history.push("/myRecipes")
    }
  }

  componentDidMount(){
      this.props.fetchWikidataList("cookingMethod")
      this.props.fetchWikidata2List("cuisine")
      this.props.fetchWikidata3List("kitchenware")
      if(this.props.match.params.id!="-1"){
        this.props.fetchDetailAboutRecipe(this.props.match.params.id)
        this.update = true
      }
    }

   createInputTextFieldWithLabel(allValues, formLabel, placeholder, name, errors, touched, href, value) {
       return(
        <Col>
            <Nav.Link className="p-0 m-0" href={href}><h6 className="text-muted font-weight-bold mt-2">{formLabel}</h6></Nav.Link>
            <Field placeholder={placeholder} name={name} type="input" as={Form.Control} isInvalid={!!errors && touched} value={value==null ? "" : value} />
            <Form.Control.Feedback type="invalid"> {errors} </Form.Control.Feedback>
        </Col>
       )
    }

    createTextAreaField(allValues, formLabel, placeholder, name, rows, errors, touched, href, handleChange, value){
        return(
            <Col>
                <Nav.Link className="p-0 m-0" href={href}><h6 className="text-muted font-weight-bold mt-2">{formLabel}</h6></Nav.Link>
                <Form.Control value={value==null ? "" : value} as="textarea"  placeholder={placeholder} name={name} rows={rows} isInvalid={!!errors && touched} onChange={e => {handleChange(e)}}/>
                <Form.Control.Feedback type="invalid"> {errors} </Form.Control.Feedback>
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

    createInputTextFieldWithoutLabel(allValues, name, placeholder, className, errors, touched, value){
        return(
          <Col className={className}>
            <Field placeholder={placeholder} name={name} type="input" as={Form.Control} isInvalid={!!errors && touched} value={value==null? "":value} />
            <Form.Control.Feedback type="invalid"> {errors} </Form.Control.Feedback>
          </Col>
        )
    }

    createSelectFieldWithSimpleArrayOfOption(allValues, name, index, value, arrayOfOption, handleChange, arrayHelpers, className){
      return(
        <Row className={`${className} m-0`} key={index}>
          <Form.Control name={name} value={value==null ? "" : value} as="select" className="float-left w-75 mt-2"
              onChange={e => {handleChange(e)}}>
              {arrayOfOption.map((elem) => {return <option value={!elem ? " " : elem} key={elem}>{elem}</option>})}
          </Form.Control>
          <Button onClick={() => {arrayHelpers.remove(index);}} variant="danger ml-2" className="button2 float-left mt-1 mr-2"><p>x</p></Button>
          </Row>
      )
    }

    createSelectFieldWithWikidataArrayOfOption(allValues, name, index, value, arrayOfOption, handleChange, arrayHelpers, className){
      return(
        <Row className={`${className} m-0`} key={index}>
          <Form.Control name={`${name}.uri`} value={value==null ? "" : value} as="select" className="float-left w-75 mt-2"
              onChange={e => {handleChange(e)}}>
              {arrayOfOption.map((elem, index2) => {return <option value={elem.uri==null ? "" : elem.uri} key={elem.uri+index2}>{elem.label}</option>})}
          </Form.Control>
          <Button onClick={() => {arrayHelpers.remove(index);}} variant="danger ml-2" className="button2 float-left mt-1 mr-2"><p>x</p></Button>
        </Row>
      )
    }

    createFieldOfIngredient(allValues, elem, index, nameArray, arrayHelpers, array, handleChange, errors, touched, values){
      return(
        <Row key={index}>
          {this.createInputTextFieldWithoutLabel(allValues, `${nameArray}.${index}.hasQuantity.hasCount`, "Enter quantity", "col-3 p-1", errors && errors.hasQuantity && errors.hasQuantity.hasCount, touched && touched.hasQuantity && touched.hasQuantity.hasCount, values && values.hasQuantity && values.hasQuantity.hasCount)}
          <Col className="col-2 p-1" >
          <Form.Control name={`${nameArray}.${index}.hasQuantity.hasMetricQuantity`} value={array[index].hasQuantity == null ? "" : array[index].hasQuantity.hasMetricQuantity} as="select"
              onChange={e => {handleChange(e)}}>
              {units.map((elem) => {return <option value={elem==null ? "" : elem} key={elem}>{elem}</option>})}
          </Form.Control></Col>
          {this.createInputTextFieldWithoutLabel(allValues, `${nameArray}.${index}.label`, "Enter name of ingredient from food list", "col-6 p-1", errors && errors.label, touched && touched.label, values && values.label)}
          <Col className="col"><Button onClick={() => arrayHelpers.remove(index)} variant="danger" className="button2"><p>x</p></Button></Col>
        </Row>
      )
    }

    createSubsteps(allValues, formLabel, nameArray, array, errors, touched, handleChange, href){
      return(
        <Col>
          <Nav.Link className="p-0 m-0 mt-4" href={href}><h6 className="text-muted font-weight-bold mt-2">{formLabel}</h6></Nav.Link>
          <FieldArray name={nameArray}>
              {arrayHelpers => (
              <div> {array && array.map((elem, index) => {
                  return (<Row key={index}>
                      {this.createTextAreaField(allValues,`${index + 1}.substep`, "Enter description of step...", `${nameArray}.${index}.hasDescription`, "2", errors && errors.hasDescription, touched && touched.hasDescription, urlMember, handleChange, elem.hasDescription)}
                      <Col className="col-1 mt-5"><Button onClick={() => arrayHelpers.remove(index)} variant="danger" className="button2"><p>x</p></Button></Col>
                  </Row>
                    )})}
                    <Button onClick={()=> {var id=new Date().getTime(); arrayHelpers.push({uri:dbRecipes + "sub" + id, hasDescription:""})}} variant="success" className="button2 mt-2 mb-4"><p>+</p></Button>
                }</div>)}
          </FieldArray>
        </Col>
      )
    }

    createFieldOfInstruction(allValues, name, index, handleChange, arrayHelpers, className, errors, touched, values){
      return(
        <Card bg="white" text="light" className="mb-3" key={index}>
          <Card.Header><Nav.Link className="p-0" href={urlMember}><h4 className="text-info font-weight-bold mt-2 p-0">{index+1}.step</h4></Nav.Link></Card.Header>
        <Card.Body>
        <Row>
          {this.createTextAreaField(allValues, "Description of step:", "In this step you should...", `${name}.hasDescription`, "4", errors && errors.hasDescription, touched, urlOntology + "hasDescription", handleChange, values.hasDescription)}
          {this.createTextAreaField(allValues, "State in which step ends:", "Enter state in which step ends...", `${name}.hasEndPoint`, "4", errors && errors.hasEndPoint, touched && touched.hasEndPoint, urlOntology+"hasEndPoint", handleChange, values.hasEndPoint)}
        </Row>
        <Row>
          {this.createSubsteps(allValues, "Substeps of this step:", `${name}.hasInstructions.li`, values && values.hasInstructions && 
          values.hasInstructions.li, errors && errors.hasInstructions && errors.hasInstructions.li, touched && touched.hasInstructions && 
          touched.hasInstructions.li, handleChange, `${urlOntology}hasInstructions`)}
        </Row>
        <Row>
          {this.createInputTextFieldWithLabel(allValues, "Needed temperature:", "Enter needed temperature", `${name}.needsTemperature`, errors && errors.needsTemperature, touched, urlOntology+"needsTemperature", values && values.needsTemperature)}
          {this.createInputTextFieldWithLabel(allValues, "Cooking time - number of hours:", "Enter number of hour", `${name}.hasCookTime.hours`, errors && errors.hasCookTime && errors.hasCookTime.hours, touched && touched.hasCookTime && touched.hasCookTime.hours, urlOntology + "hasCookTime", values && values.hasCookTime && values.hasCookTime.hours)}
          {this.createInputTextFieldWithLabel(allValues, "Cooking time - number of minutes:", "Enter number of minutes", `${name}.hasCookTime.minutes`, errors && errors.hasCookTime && errors.hasCookTime.minutes, touched && touched.hasCookTime && touched.hasCookTime.minutes, urlOntology + "hasCookTime", values && values.hasCookTime && values.hasCookTime.minutes)}
        </Row>
        <Row>
          {this.createArrayField(allValues, "Cooking methods:", `${name}.usingMethod`, values.usingMethod, "", errors, touched, urlOntology + "usingMethod", handleChange)}
          {this.createArrayField(allValues, "Kitchenware:", `${name}.requiresEquipment`, values.requiresEquipment, "Enter name of kitchenware from kitchenware list", errors, touched, urlOntology + "requiresEquipment", handleChange)}
          {this.createInputTextFieldWithLabel(allValues, "Produces food:", "Enter name of food from food list", `${name}.produces.label`, errors && errors.produces && errors.produces.label, touched && touched.produces && touched.produces.label, urlOntology+"produces")}
        </Row>
        <Row>
          {this.createArrayField(allValues, "Ingredients:", `${name}.hasIngredient`, values.hasIngredient, "", errors && errors.hasIngredient, touched && touched.hasIngredient, urlOntology + "hasIngredient", handleChange, values.hasIngredient)}
        </Row>
        <Row className="m-2 mt-3"><Button onClick={() => arrayHelpers.remove(index)} variant="danger"><h6 className="m-0 font-weight-bolder">Delete step</h6></Button></Row>
        </Card.Body>
        </Card>
      )

    }

    createInstructions(allValues, formLabel, nameArray, array, placeholder, errors, touched, href, handleChange){
      return(
          <Row>
              {this.createArrayField(allValues, formLabel,`${nameArray}.li`, array.li, placeholder, errors && errors.li, touched && touched.li, href, handleChange)}
          </Row>
      )
    }

    createArrayField(allValues, formLabel, nameArray, array, placeholder, errors, touched, href, handleChange, values){
      return(
        <Col>
            <Nav.Link className="p-0 m-0" href={href}><h6 className="text-muted font-weight-bold mt-2">{formLabel}</h6></Nav.Link>
            <FieldArray name={nameArray}>
              {arrayHelpers => (
                <div>
                  {array.map((elem, index) => {
                    return (
                      nameArray.endsWith("hasIngredient") ? 
                        this.createFieldOfIngredient(allValues, elem, index, nameArray, arrayHelpers, array, handleChange, errors && errors[index], touched && touched[index], values && values[index]) 
                      : nameArray.endsWith("hasInstructions.li") ? 
                        this.createFieldOfInstruction(allValues, `${nameArray}.${index}`, index, handleChange, arrayHelpers, "", errors && errors[index], touched && touched[index], elem)
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
                    <Button onClick={() => {var id=new Date().getTime(); structureOfhasIngredient.uri = dbRecipes + "ing" + id, structureOfhasIngredient.hasQuantity.uri = dbRecipes + "mass" + id
                      arrayHelpers.push(structureOfhasIngredient)}} variant="success" className="button2 mt-2"><p>+</p></Button> 
                    : nameArray.endsWith("hasInstructions.li") ? 
                    <Button onClick={() => {var id=new Date().getTime(); structureOfLiOfhasInstruction.uri = dbRecipes + "ins" + id
                      arrayHelpers.push(structureOfLiOfhasInstruction
                      )}} variant="success" className="mt-2"><h6 className="m-0 font-weight-bolder">Add new step</h6></Button> 
                    : nameArray.endsWith("belongsToCategory") ?
                      <Button onClick={() => {arrayHelpers.push("")}} variant="success" className="button2 mt-2"><p>+</p></Button>
                    : <Button onClick={() => {arrayHelpers.push(structureOfWikidataEntity)}} variant="success" className="button2 mt-2"><p>+</p></Button>
                   }
                  </div>
              )}
            </FieldArray>
        </Col>
      )
    }

  incorrectInputAlert(error){
      return (
          <Alert variant="danger" className="mt-3">
              <Alert.Heading>You got an error!</Alert.Heading>
                  <p>{error || error.map((e) => e)}</p>
          </Alert>
      )
  }

  createFormular(){
    this.initVal = this.props.recipes.recipeDetail
    return ( 
      <div>
        <Formik
            initialValues={ this.initVal}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              values.hasAuthor = JSON.parse(localStorage.getItem("user"))
              setSubmitting(true);
              if(this.update){
                this.props.updateRecipe(values.hasAuthor.username, values.uri, values)
              } else {
                this.props.createRecipe(values)
              }
              this.submit = true
              setSubmitting(false)
            }
            }>
            {({ touched, values, errors, isSubmitting, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
                {this.props.recipes.error && this.incorrectInputAlert(this.props.recipes.error)}

              <Card bg="light" className="mb-3">
                <Card.Body>
                <Row>
                    {this.createInputTextFieldWithLabel(values, "*Recipe name:", "Enter name of recipe", "label", errors.label, touched.label, urlLabel, values.label)}
                    {this.createInputTextFieldWithLabel(values, "*Produces food:", "Enter name of food from food list", "produces.label", errors.produces && errors.produces.label, touched.produces, urlOntology+"produces", values.produces && values.produces.label)}
                </Row>

                <Row>
                    {this.createTextAreaField(values, "*Short description of recipe:", "Enter short description of recipe...", "hasDescription", "4", errors.hasDescription, touched, urlOntology + "hasDescription", handleChange, values.hasDescription)}
                </Row>
                
                <Row>
                    {this.createInputTextFieldWithLabel(values, "Cooking time - number of hours:", "Enter number of hour", "hasCookTime.hours", errors.hasCookTime && errors.hasCookTime.hours, touched.hasCookTime && touched.hasCookTime.hours, urlOntology + "hasCookTime",values.hasCookTime && values.hasCookTime.hours)}
                    {this.createInputTextFieldWithLabel(values, "Cooking time - number of minutes:", "Enter number of minutes", "hasCookTime.minutes", errors.hasCookTime && errors.hasCookTime.minutes, touched.hasCookTime && touched.hasCookTime.minutes, urlOntology + "hasCookTime", values.hasCookTime && values.hasCookTime.minutes)}
                    {this.createInputTextFieldWithLabel(values, "Number of portions:", "Enter number of portions", "hasNumberOfPortions", errors.hasNumberOfPortions, touched.hasNumberOfPortions, urlOntology + "hasNumberOfPortions", values.hasNumberOfPortions)}
                </Row>

                <Row>
                    {this.createArrayField(values, "Cuisines:", "belongsToCuisine", values.belongsToCuisine, "Enter name of cuisine from cuisine list", errors, touched, urlOntology + "belongsToCuisine", handleChange)}
                    {this.createArrayField(values, "Kitchenware:", "requiresEquipment", values.requiresEquipment, "Enter name of kitchenware from kitchenware list", errors, touched, urlOntology + "requiresEquipment", handleChange)}
                </Row>

                <Row className="mb-5">
                    {this.createArrayField(values, "Categories:", "belongsToCategory", values.belongsToCategory, "", errors, touched, urlOntology + "belongsToCategory", handleChange)}
                    {this.createArrayField(values, "Cooking methods:", "usingMethod", values.usingMethod, "", errors, touched, urlOntology + "usingMethod", handleChange)}
                </Row>
                </Card.Body>
                </Card>

                <Card bg="light" className="mb-3">
                <Card.Body>
                <h3 className="d-flex justify-content-center font-weight-bolder p-0 mb-0 text-info">Ingredient list</h3>
                <Row>
                    {this.createArrayField(values, "*Ingredients:", "hasIngredient", values.hasIngredient, "", errors.hasIngredient, touched.hasIngredient, urlOntology + "hasIngredient", handleChange, values.hasIngredient)}
                </Row>
                </Card.Body>
                </Card>

                <Card bg="light" className="mb-3">
                <Card.Body>
                <h3 className="d-flex justify-content-center font-weight-bolder p-0 mb-0 text-info">Cooking instruction list</h3>
                {this.createInstructions(values, "*Cooking instructions:", "hasInstructions", values.hasInstructions, "", errors.hasInstructions, touched.hasInstructions, urlOntology + "hasInstructions", handleChange, values.hasInstructions)}
                </Card.Body>
                </Card>
              <div className="d-flex justify-content-center mt-3 mb-5">
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
            cantDisplay("You can't create your own recipe", "You should log in")
          : this.props.recipes.loading ?
            loading(this.props.recipes.loading) 
          : this.props.recipes.loading ?
            displayError(this.props.recipes.error, this.props.recipes.error) 
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
      fetchDetailAboutRecipe: (detail) => dispatch(fetchDetailAboutRecipe(detail)),
      updateRecipe: (user, uri, recipe) => dispatch(updateRecipe(user, uri, recipe))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe)


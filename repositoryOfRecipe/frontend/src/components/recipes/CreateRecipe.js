import React, { Component } from 'react'
import { Col, Button, Form, Container, Row} from "react-bootstrap"
import * as yup from "yup"
import { Formik, Field, FieldArray} from "formik"

/*
const validationSchema = yup.object({
  listEntities: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});*/

export default class CreateRecipe extends Component{

  constructor(props){
    super(props)
    this.state = {ingredients:[]}
  }

  createFormular(){
    return (
      <div>
        <Formik
            validateOnChange={false}
            initialValues={{
              recipeName:"",
              recipeDescription:"",
              timeHours:"",
              timeMinutes:"",
              portions:"",
              categories: [{ label: "", id:"" + Math.random() }],
              methods: [{ label: "", id:"" + Math.random() }],
              cuisine:"",
              ingredients: [{ label: "", quantity:"", unit:"", id:"" + Math.random() }], 

            }}
           // validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("sOOOOOOM Tu: ");
              setSubmitting(true);
              console.log("submit: ", values);
              setSubmitting(false);
            }}>
            {({ values, errors, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              
              <Form.Label className="text-muted font-weight-bold">Recipe name:</Form.Label>
              <Field placeholder="Enter name of recipe" name="recipeName" type="input" as={Form.Control} isInvalid={!!errors.recipeName} />

              <Form.Label className="text-muted font-weight-bold mt-5">Short description of recipe:</Form.Label>
              <Form.Control as="textarea" name="recipeDescription" placeholder="Enter short description of recipe..." rows="4"/>

              <Row>
                <Col>
                  <Form.Label className="text-muted font-weight-bold mt-5">Cooking time - number of hours:</Form.Label>
                  <Field placeholder="Enter number of hour" name="timeHours" type="input" as={Form.Control} isInvalid={!!errors.timeHours} />
                </Col>

                <Col>
                  <Form.Label className="text-muted font-weight-bold mt-5">Cooking time - number of minutes:</Form.Label>
                  <Field placeholder="Enter number of minutes" name="timeMinutes" type="input" as={Form.Control} isInvalid={!!errors.timeMinutes} />
                </Col>

                <Col>
                  <Form.Label className="text-muted font-weight-bold mt-5">Number of portions:</Form.Label>
                  <Field placeholder="Enter number of portions" name="portions" type="input" as={Form.Control} isInvalid={!!errors.portions} />
                </Col>

              </Row>

              <Form.Label className="text-muted font-weight-bold mt-5">Categories:</Form.Label>
              <FieldArray name="categories">
                {arrayHelpers => (
                  <div>
                    {values.categories.map((elem, index) => {
                      return (
                        <Row key={elem.id}>
                          <Col className="mt-1"><Form.Control name={`categories.${index}.label`} as="select">
                          <option>cup</option>
                          <option>kg</option>                        
                          </Form.Control></Col>
                          <Col className="mt-1"><Button onClick={() => arrayHelpers.remove(index)} variant="danger" className="button2"><p>x</p></Button></Col>
                        </Row>
                      );
                    })}
                    <Button onClick={() => {arrayHelpers.push({name: "", id: "" + Math.random()})}} variant="success" className="button2 mt-2"><p>+</p></Button>
                  </div>
                )}
              </FieldArray>
              
              <Form.Label className="text-muted font-weight-bold mt-5">Cooking methods:</Form.Label>
              <FieldArray name="methods">
                {arrayHelpers => (
                  <div>
                    {values.methods.map((elem, index) => {
                      return (
                        <Row key={elem.id}>
                          <Col className="mt-1"><Field placeholder="Enter cooking methods" name={`methods.${index}.label`} type="input" as={Form.Control} isInvalid={!!errors.methods} /></Col>                          
                          <Col className="mt-1"><Button onClick={() => arrayHelpers.remove(index)} variant="danger" className="button2"><p>x</p></Button></Col>
                        </Row>
                      );
                    })}
                    <Button onClick={() => {arrayHelpers.push({label: "", id: "" + Math.random()})}} variant="success" className="button2 mt-2"><p>+</p></Button>
                  </div>
                )}
              </FieldArray>

              <Form.Label className="text-muted font-weight-bold mt-5">Cuisine:</Form.Label>
              <Field placeholder="Enter name of cuisine" name="recipeCuisine" type="input" as={Form.Control} isInvalid={!!errors.recipeCuisine} />

              <h3 className="d-flex justify-content-center font-weight-bolder mt-5 mb-4 text-info">Ingredient list</h3>

              <Form.Label className="text-muted font-weight-bold">Information about ingredient:</Form.Label>
              <FieldArray name="ingredients">
                {arrayHelpers => (
                  <div>
                    {values.ingredients.map((elem, index) => {
                      return (
                        <Row key={elem.id}>
                          <Col className="col-4 p-1"><Field placeholder="Enter name" name={`ingredients.${index}.label`} type="input" as={Form.Control} isInvalid={!!errors.ingredients} /></Col>
                          <Col className="col-4 p-1"><Field placeholder="Enter quantity" name={`ingredients.${index}.quantity`} type="input" as={Form.Control} isInvalid={!!errors.ingredients} /></Col>
                          <Col className="col-3 p-1"><Form.Control name={`ingredients.${index}.unit`} as="select">
                          <option>cup</option>
                          <option>kg</option>                        
                          </Form.Control></Col>
                          <Col className="col"><Button onClick={() => arrayHelpers.remove(index)} variant="danger" className="button2"><p>x</p></Button></Col>
                        </Row>
                      );
                    })}
                    <Button onClick={() => {arrayHelpers.push({name: "", id: "" + Math.random()})}} variant="success" className="button2 mt-2"><p>+</p></Button>
                  </div>
                )}
              </FieldArray>

              <h3 className="d-flex justify-content-center font-weight-bolder mt-5 mb-4 text-info">Cooking instructions</h3>
              
              <Form.Label className="text-muted font-weight-bold">Information about ingredient:</Form.Label>
              <FieldArray name="ingredients">
                {arrayHelpers => (
                  <div>
                    {values.ingredients.map((elem, index) => {
                      return (
                        <Row key={elem.id}>
                          <Col className="col-4 p-1"><Field placeholder="Enter name" name={`ingredients.${index}.label`} type="input" as={Form.Control} isInvalid={!!errors.ingredients} /></Col>
                          <Col className="col-4 p-1"><Field placeholder="Enter quantity" name={`ingredients.${index}.quantity`} type="input" as={Form.Control} isInvalid={!!errors.ingredients} /></Col>
                          <Col className="col-3 p-1"><Form.Control name={`ingredients.${index}.unit`} as="select">
                          <option>cup</option>
                          <option>kg</option>                        
                          </Form.Control></Col>
                          <Col className="col"><Button onClick={() => arrayHelpers.remove(index)} variant="danger" className="button2"><p>x</p></Button></Col>
                        </Row>
                      );
                    })}
                    <Button onClick={() => {arrayHelpers.push({name: "", id: "" + Math.random()})}} variant="success" className="button2 mt-2"><p>+</p></Button>
                  </div>
                )}
              </FieldArray>

              <div className="d-flex justify-content-center mt-5 mb-5">
                <Button disabled={isSubmitting} type="submit" variant="success" className="button2 mt-2 w-50"><p>Save</p></Button>
              </div>
            </Form> )}
          </Formik>
        </div>
        )}


    render(){
        return(
            <Container>
                <h2 className="d-flex justify-content-center font-weight-bolder mt-5 mb-2 text-info">You can create your own recipe by filling out the form</h2>
                <h5 className="d-flex justify-content-center font-weight-bolder mb-5 text-muted">and enrich our repository of recipes</h5>
                {this.createFormular("recipe", true)}
            </Container>
    )
    }
}
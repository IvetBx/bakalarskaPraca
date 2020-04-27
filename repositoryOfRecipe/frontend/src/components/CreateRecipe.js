import React, { Component } from 'react'
import  { withFormik } from "formik"
import { Col, Button, Form, Container, Row} from "react-bootstrap"
import * as yup from "yup"

const RecipeTextComponent = ({ label, id, placeholder, handleChange, value, error}) =>
  {
      return(
            <Form.Group as={Col} controlId={id}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={placeholder}
                  name={id}
                  value={value}
                  onChange={handleChange}
                  isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
             </Form.Group>
      )
  }

const IngredientFormComponent = ({ handleChange, values, errors }) => {
    return(
        <div>
        <Form.Row>
            <RecipeTextComponent label="" id="ingredientName" placeholder="Enter name of ingredient"
             handleChange={handleChange} value={values.ingredientName} error={errors.ingredientName} />

            <RecipeTextComponent label="" id="quantity" placeholder="Enter quantity"
             handleChange={handleChange} value={values.quantity} error={errors.quantity} />

            <RecipeTextComponent label="" id="unit" placeholder="Enter metric unit"
             handleChange={handleChange} value={values.unit} error={errors.unit} />
        </Form.Row>
        
        <div className="d-flex justify-content-end">
            <Button variant="success mr-2" className="but"><p>+</p></Button>
            <Button variant="danger" className="but"><p>-</p></Button>
        </div>

        </div>
    )
}

const FormRecipe = ({
  handleSubmit,
  handleChange,
  values,
  errors,
  isValid
  }) => (
    <Form noValidate onSubmit={handleSubmit} className="font-weight-bolder">
        <Form.Row>
            <RecipeTextComponent label="Recipe name:" id="recipeName" placeholder="Enter recipe name"
             handleChange={handleChange} value={values.recipeName} error={errors.recipeName} />
        </Form.Row>

    <Form.Row className="mt-4">
        <Form.Group controlId="recipeDescription" as={Col}>
            <Form.Label>Short description of recipe:</Form.Label>
            <Form.Control as="textarea" placeholder="Enter short description of recipe"/>
        </Form.Group>
    </Form.Row>

    <Form.Row className="mt-4"> 
        <RecipeTextComponent label="Cooking time - number of hours:" id="timeHours"  placeholder="Enter number of hours"
        handleChange={handleChange} value={values.timeHours} error={errors.timeHours} />

        <RecipeTextComponent label="Cooking time - number of minutes:" id="timeMinutes" placeholder="Enter number of minutes"
        handleChange={handleChange} value={values.timeMinutes} error={errors.timeMinutes} />
    </Form.Row>

    <Form.Row className="mt-4">
        <RecipeTextComponent label="Number of portions:" id="portions" placeholder="Enter number of portions"
        handleChange={handleChange} value={values.portions} error={errors.portions} />
    </Form.Row>

    <h4 className="d-flex justify-content-center font-weight-bolder mt-5 mb-4 text-info">Ingredient list</h4>
    <IngredientFormComponent handleChange={handleChange} values={values} errors={errors} />
    <IngredientFormComponent handleChange={handleChange} values={values} errors={errors} />

    <Row className="mt-5 mb-5">
        <Col></Col>
        <Col><Button variant="success" type="submit" block>Save</Button></Col>
        <Col></Col>
    </Row>
  </Form>
  )

const FormRecipeFormik = withFormik({
  mapPropsToValues({minTime, maxTime}) {
    return {
      minTime:minTime || "",
      maxTime:maxTime || ""
    }
  },
  handleSubmit(values){
    console.log(values)
  },
  validationSchema:yup.object().shape({
    minTime: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").required(),
    maxTime: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").required()
  })
})(FormRecipe)



export default class CreateRecipe extends Component{


    render(){
        return(
            <Container>
                <h2 className="d-flex justify-content-center font-weight-bolder mt-5 mb-2 text-info">You can create your own recipe by filling out the form</h2>
                <h5 className="d-flex justify-content-center font-weight-bolder mb-5 text-muted">and enrich our repository of recipes</h5>
                <FormRecipeFormik />
            </Container>
    )
    }
}
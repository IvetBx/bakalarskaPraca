import React from "react"
import {Modal, Button, Row, Col} from "react-bootstrap"
import FormLabel from 'react-bootstrap/FormLabel'; 
import FormControl from 'react-bootstrap/FormControl'; 
import * as yup from "yup"
import { connect } from 'react-redux'
import { Formik, Field, Form, FieldArray} from "formik"
import { setIncludedIngredients, setExcludedIngredients, setIncludedAuthors, setExcludedAuthors, 
setIncludedCategories, setExcludedCategories, setIncludedCuisines, setExcludedCuisines,
setIncludedKitchenware, setExcludedKitchenware, setIncludedMethods, setExcludedMethods  } from "../../redux"


const validationSchema = yup.object({
  listEntities: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});


function FilterModalExcludedIncluded (props) {

  const createFormular = (included) => {
    var initVal = [{ name: "", id: "" + Math.random() }];
    if(props.included && props.included.length && included){
        initVal = props.included
    }
    if(props.excluded && props.excluded.length && !included){
      initVal = props.excluded
    }

    return (
      <div>
        <Formik
            validateOnChange={false}
            initialValues={{
              listEntities: initVal
            }}

            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              if(included){
                props.set_included(data.listEntities)
              } else {
                props.set_excluded(data.listEntities)
              }
              setSubmitting(false);
            }}
        >
            {({ values, errors, isSubmitting }) => (
      
            <Form>
              {included ? <FormLabel className="text-info font-weight-bold">Include {props.singular}:</FormLabel> : <FormLabel className="text-info font-weight-bold">Exclude {props.singular}:</FormLabel>}
              <FieldArray name="listEntities">
                {arrayHelpers => (
                  <div>
                    {values.listEntities.map((elem, index) => {
                      return (
                        <div key={elem.id}>
                          <Field placeholder={`Enter name of ${props.singular}`} name={`listEntities.${index}.name`} type="input" as={FormControl} className="float-left w-75 mt-1" isInvalid={!!errors.listEntities} />
                          <Button onClick={() => arrayHelpers.remove(index)} variant="danger ml-2" className="button2 float-left mt-1 mr-2"><p>x</p></Button>
                        </div>
                      );
                    })}
                    <Button onClick={() => {arrayHelpers.push({name: "", id: "" + Math.random()})}} variant="info" className="button2 mt-2"><p>+</p></Button>
                  </div>
                )}

              </FieldArray>
              <div className="d-flex justify-content-start">
                <Button disabled={isSubmitting} type="submit" variant="success" className="button2 mt-2 w-50"><p>Save</p></Button>
              </div>
            </Form> )}
          </Formik>
        </div>
        )}

    return(
            <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`Assign a filter to ${props.plural}`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container">
            <Row>
                <Col sm={6}> {createFormular(true)}</Col>
                <Col sm={6}> {createFormular(false)}</Col>
            </Row>
        </div>
      </Modal.Body>

      <Modal.Footer>    
      </Modal.Footer>

    </Modal>
        )
}

const mapStateToProps = (state, ownProps) => {
  const includedState = (ownProps.singular === "ingredient") 
  ? state.recipes.inIngredients
  : (ownProps.singular === "author")
  ? state.recipes.inAuthors
  : (ownProps.singular === "category")
  ? state.recipes.inCategories
  : (ownProps.singular === "cooking method")
  ? state.recipes.inMethods
  : (ownProps.singular === "cuisine")
  ? state.recipes.inCuisines  
  : state.recipes.inKitchenware

  const excludedState = (ownProps.singular === "ingredient") 
  ? state.recipes.exIngredients
  : (ownProps.singular === "author")
  ? state.recipes.exAuthors
  : (ownProps.singular === "category")
  ? state.recipes.exCategories
  : (ownProps.singular === "cooking method")
  ? state.recipes.exMethods
  : (ownProps.singular === "cuisine")
  ? state.recipes.exCuisines  
  : state.recipes.exKitchenware

  return {
      included: includedState,
      excluded: excludedState
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  const includedDispatch = (ownProps.singular === "ingredient") 
  ? (inc) => dispatch(setIncludedIngredients(inc)) 
  : (ownProps.singular === "author") 
  ? (inc) => dispatch(setIncludedAuthors(inc))
  : (ownProps.singular === "category") 
  ? (inc) => dispatch(setIncludedCategories(inc))  
  : (ownProps.singular === "cooking method") 
  ? (inc) => dispatch(setIncludedMethods(inc))
  : (ownProps.singular === "cuisine") 
  ? (inc) => dispatch(setIncludedCuisines(inc))
  : (inc) => dispatch(setIncludedKitchenware(inc))

  const excludedDispatch = (ownProps.singular === "ingredient") 
  ? (exc) => dispatch(setExcludedIngredients(exc)) 
  : (ownProps.singular === "author") 
  ? (exc) => dispatch(setExcludedAuthors(exc))
  : (ownProps.singular === "category") 
  ? (exc) => dispatch(setExcludedCategories(exc))  
  : (ownProps.singular === "cooking method") 
  ? (exc) => dispatch(setExcludedMethods(exc))
  : (ownProps.singular === "cuisine") 
  ? (exc) => dispatch(setExcludedCuisines(exc))
  : (exc) => dispatch(setExcludedKitchenware(exc))

  return {
      set_included: includedDispatch,
      set_excluded: excludedDispatch
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterModalExcludedIncluded)
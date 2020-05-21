import React from "react"
import {Modal, Button, Row, Col} from "react-bootstrap"
import FormLabel from 'react-bootstrap/FormLabel'; 
import FormControl from 'react-bootstrap/FormControl'; 
import FormCheck from 'react-bootstrap/FormCheck'
import * as yup from "yup"
import { connect } from 'react-redux'
import { Formik, Field, Form, FieldArray } from "formik"
import { setIncludedIngredients, setExcludedIngredients, setIncludedAuthors, setExcludedAuthors, 
setIncludedCategories, setExcludedCategories, setIncludedCuisines, setExcludedCuisines,
setIncludedKitchenware, setExcludedKitchenware, setIncludedMethods, setExcludedMethods  } from "../../../redux/Index"

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
              listEntities: initVal,
              allTogether: props.allTogether
            }}
            validationSchema={validationSchema}
        >
            {({ values, errors, isSubmitting, handleBlur, handleChange}) => (
      
            <Form>
              {included ? 
                <Row><FormLabel className="text-info font-weight-bold">Include {props.singular}:</FormLabel></Row>         
          : <FormLabel className="text-info font-weight-bold">Exclude {props.singular}:</FormLabel>}
              <FieldArray name="listEntities">
                {arrayHelpers => (
                  <div>
                    {values.listEntities.map((elem, index) => {
                      return (
                        <Row key={elem.id}>
                          <Field placeholder={`Enter name of ${props.singular}`} name={`listEntities.${index}.name`} type="input" as={FormControl} className="float-left w-75 mt-1" isInvalid={!!errors.listEntities}     onBlur={e => {
        handleBlur(e)
        let someValue = e.currentTarget.value
        if(someValue){
          if(included){
            props.set_included(values.listEntities, !values.allTogether)
          } else {
            props.set_excluded(values.listEntities)
          }
        }
    }}/>                  <Button onClick={() => {arrayHelpers.remove(index);
                                      var first = values.listEntities.slice(0, index)
                                      var second = values.listEntities.slice(index + 1)   
                                      var concat = first.concat(second);
                                      if(!concat.length){
                                        concat = []
                                      }
                                      if(included){
                                        props.set_included(concat, values.allTogether)
                                      } else {
                                        props.set_excluded(concat)
                                      }
                                }} variant="danger ml-2" className="button2 float-left mt-1 mr-2"

                          ><p>x</p></Button>
                          
                        </Row>
                      );
                    })}
                    <Row><Button onClick={() => {arrayHelpers.push({name: "", id: "" + Math.random()})}} variant="info" className="button2 mt-2"><p>+</p></Button></Row>
                  </div>
                )}

              </FieldArray>
              {included ? <Row className="mt-3"><Field
              required
              name="allTogether"
              as={FormCheck}
              id="validationFormik0"
              type="checkbox"
              onChange={e => {
                handleChange(e)
                  if(included){
                    props.set_included(values.listEntities, !values.allTogether)
                  } else {
                    props.set_excluded(values.listEntities)
                  }
            }}
            /><FormLabel className="text-muted font-weight-bold">
            include all the listed items in one recipe </FormLabel></Row> : null}
              
            </Form> )}
          </Formik>
        </div>
        )}

    return(
            <Modal
      show={props.show} onHide={props.onHide}
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

  const allTogetherState = (ownProps.singular === "ingredient") 
  ? state.recipes.Iall
  : (ownProps.singular === "author")
  ? state.recipes.Aall
  : (ownProps.singular === "category")
  ? state.recipes.CAall
  : (ownProps.singular === "cooking method")
  ? state.recipes.Mall
  : (ownProps.singular === "cuisine")
  ? state.recipes.CUall  
  : state.recipes.Kall


  return {
      included: includedState,
      excluded: excludedState,
      allTogether: allTogetherState
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  const includedDispatch = (ownProps.singular === "ingredient") 
  ? (inc, allTogether) => dispatch(setIncludedIngredients(inc, allTogether)) 
  : (ownProps.singular === "author") 
  ? (inc, allTogether) => dispatch(setIncludedAuthors(inc, allTogether))
  : (ownProps.singular === "category") 
  ? (inc, allTogether) => dispatch(setIncludedCategories(inc, allTogether))  
  : (ownProps.singular === "cooking method") 
  ? (inc, allTogether) => dispatch(setIncludedMethods(inc, allTogether))
  : (ownProps.singular === "cuisine") 
  ? (inc, allTogether) => dispatch(setIncludedCuisines(inc, allTogether))
  : (inc, allTogether) => dispatch(setIncludedKitchenware(inc, allTogether))

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
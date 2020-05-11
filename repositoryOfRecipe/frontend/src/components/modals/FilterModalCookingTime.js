import React from "react";
import  { Formik, Field } from "formik"
import { Modal, Col, Button, Form } from "react-bootstrap"
import { connect } from 'react-redux'
import * as yup from "yup"
import {setMinTime, setMaxTime} from "../../redux"

const validationSchema = yup.object({
  minTime: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").required(),
  maxTime: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").required()
});


function FilterModalCookingTime (props) {

  const createFormular = () => {
    return (
      <div>
        <Formik
            validateOnChange={false}
            initialValues={{
              minTime:(props && props.min_time) || "", 
              maxTime:(props && props.max_time) || ""
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
                props.set_min_time(data.minTime)
                props.set_max_time(data.maxTime)
              setSubmitting(false);
            }}
        >
            {({ values, errors, handleSubmit, touched }) => 
                <Form onSubmit={handleSubmit}>
                <Form.Row>
                      <Form.Group as={Col} md="6" controlId="minTime">
                          <Form.Label>Minimum cooking time:</Form.Label>
                          <Field placeholder="Minimum time (minutes)" name="minTime" type="input" as={Form.Control} className="float-left w-75 mt-1" isInvalid={!!errors.minTime && touched.minTime} />
                          <Form.Control.Feedback type="invalid"> {errors.minTime} </Form.Control.Feedback>
                      </Form.Group>
            
                      <Form.Group as={Col} md="6" controlId="maxTime">
                          <Form.Label>Maximum cooking time:</Form.Label>
                          <Field placeholder="Maximum time (minutes)" name="maxTime" type="input" as={Form.Control} className="float-left w-75 mt-1" isInvalid={!!errors.maxTime && touched.maxTime} />
                          <Form.Control.Feedback type="invalid"> {errors.maxTime} </Form.Control.Feedback>
                      </Form.Group>
                </Form.Row>
                <div className="d-flex justify-content-center">
                  <Button variant="success" type="submit"  className="button2 mt-2 w-25"><p>Save</p></Button>
                </div>
              </Form>
            }
          </Formik>
        </div>
        )}

        return(
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Assign a filter to cooking time </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <div className="container"> {createFormular()} </div>
              </Modal.Body>

              <Modal.Footer>
              </Modal.Footer>
            </Modal>
        )
  }

const mapStateToProps = state => {
  return {
      min_time: state.recipes.minTime,
      max_time: state.recipes.maxTime
  }
}

const mapDispatchToProps = dispatch => {
  return {
      set_min_time: (time) => dispatch(setMinTime(time)),
      set_max_time: (time) => dispatch(setMaxTime(time))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterModalCookingTime)
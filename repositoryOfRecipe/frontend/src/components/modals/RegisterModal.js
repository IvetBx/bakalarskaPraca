import React from "react";
import {Modal, Button, FormControl, FormLabel, Form} from "react-bootstrap"
import * as yup from "yup"
import { Formik, Field} from "formik"
import { connect } from 'react-redux'

const validationSchema = yup.object({

});

const createFormular = () => {
    return (
        <div className="container w-50">        
        <Formik
            validationSchema={validationSchema}
            onSubmit={(values) => {
            console.log(values)
            }}
            initialValues={{}}>
            {({ handleSubmit, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <FormLabel className="text-info font-weight-bold mt-1">Username:</FormLabel>
                        <Field placeholder="Enter username" name="username" type="input" as={FormControl} isInvalid={!!errors.username && touched.username} />
                        <Form.Control.Feedback type="invalid"> {errors.username} </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <FormLabel className="text-info font-weight-bold">Password:</FormLabel>
                        <Field placeholder="Enter password" name="password" type="password" as={FormControl} isInvalid={!!errors.password && touched.username} />
                        <Form.Control.Feedback type="invalid"> {errors.password} </Form.Control.Feedback>
                    </Form.Group>
                            
                    <div className="d-flex justify-content-center">
                        <Button variant="success" type="submit" className="mt-2 mr-2 w-50">Register</Button>
                    </div>        
                </Form>
            )}
        </Formik>   
        </div>
    )}


function RegisterModal (props) {

        return(
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Create new account </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container"> {createFormular()} </div>
              </Modal.Body>
            </Modal>
        )
  }

const mapStateToProps = state => {
  return {
        userInfo: state.user 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)


import React from "react";
import {Modal, Button, FormControl, FormLabel, Form} from "react-bootstrap"
import * as yup from "yup"
import { Formik, Field} from "formik"
import { connect } from 'react-redux'
import { addUser } from "../../redux/Index"

const validationSchema = yup.object({
    username: yup.string().min(5).required(),
    password: yup.string().min(8).required()
});

const createFormular = (props) => {
    return (
        <div className="container w-50">        
        <Formik
            validationSchema={validationSchema}
            onSubmit={(values) => {
                values.uri+=values.username 
                props.add(values)
            }}
            initialValues={{
                uri:"http://localhost:3030/users#",
                username:"",
                password:""
            }
            }>
            {({ handleSubmit, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <FormLabel className="text-info font-weight-bold mt-1">Username:</FormLabel>
                        <Field placeholder="Enter username" name="username" type="input" as={FormControl} isInvalid={!!errors.username && touched.username} />
                        <Form.Control.Feedback type="invalid"> {errors.username} </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <FormLabel className="text-info font-weight-bold">Password:</FormLabel>
                        <Field placeholder="Enter password" name="password" type="password" as={FormControl} isInvalid={!!errors.password && touched.password} />
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
            <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Create new account </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container"> {createFormular(props)} </div>
              </Modal.Body>
            </Modal>
        )
  }

const mapStateToProps = state => {
  return {
        user: state.user 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (user) => dispatch(addUser(user)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)


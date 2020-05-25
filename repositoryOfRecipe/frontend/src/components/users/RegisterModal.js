import React from "react";
import {Modal, Button, Form, Container} from "react-bootstrap"
import * as yup from "yup"
import { Formik } from "formik"
import { connect } from 'react-redux'
import { addUser } from "../../redux/Index"
import { urlFOAF, urlOntology } from "../../config/Constant"
import { formField, initVal } from "./commonComponents"

const validationSchema = yup.object({
    username: yup.string().min(5).required(),
    password: yup.string().min(8).required()
});

const createFormular = (props) => {
    return (
        <Container className="w-50">        
        <Formik
            validationSchema={validationSchema}
            onSubmit={(values) => {
                values.uri+=values.username 
                props.add(values)
            }}
            initialValues={initVal}>
            {({ handleSubmit, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>

                    {formField("Username:", "input", "Enter username", "username", !!errors.username && touched.username, errors.username, `${urlFOAF}accountName`)}
                    {formField("Password:", "password", "Enter password", "password", !!errors.password && touched.password, errors.password, `${urlOntology}password`)}
                            
                    <div className="d-flex justify-content-center">
                        <Button variant="success" type="submit" className="mt-2 mr-2 w-50">Register</Button>
                    </div>        
                </Form>
            )}
        </Formik>   
        </Container>
    )}


function RegisterModal (props) {

        return(
            <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Create new account </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Container> {createFormular(props)} </Container>
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


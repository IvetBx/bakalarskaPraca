import React, { Component} from 'react';
import { Button, Container, Form, Alert } from "react-bootstrap"
import * as yup from "yup"
import { Formik } from "formik"
import RegisterModal from "./RegisterModal"
import { connect } from 'react-redux'
import { fetchUser, fetchUserFailure } from "../../redux/Index"
import { urlFOAF, urlOntology } from "../../config/Constant"
import { formField, initVal } from "./commonComponents"


const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
  });

class LogIn extends Component{

    constructor(props){
        super(props);
        this.state = {ModalShow : false, username:"", password:"", alertShow : false}
    }

    incorrectInputAlert(){
        return (
            <Alert variant="danger" className="mt-3" onClose={() => this.props.fetchUserFailure("")} dismissible>
                <Alert.Heading>You got an error!</Alert.Heading>
                    <p>{this.props.user.error}</p>
            </Alert>
        )
    }

    buttonsDiv(addModalClose){
        return (
            <div className="d-flex justify-content-center">
                <Button variant="success" type="submit" className="mt-2 mr-2">Log In</Button>
                <Button variant="info" className="mt-2" onClick={() => this.setState({ModalShow:true})}>Create new account</Button>
                <RegisterModal show={this.state.ModalShow && !this.props.user.error} onHide={addModalClose} />  
            </div> 
        )
    }

    render(){
        let addModalClose=() => this.setState({ModalShow : false})
        const localStorageUser = JSON.parse(localStorage.getItem("user"))
        return(
            <Container className="w-25">  
            { this.props.user.error ? this.incorrectInputAlert() : null }  
            { !localStorageUser.username ?
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={(values) => { this.props.fetchUser(values.username, values.password) }}
                    initialValues={initVal}>
                {({ handleSubmit, touched, errors }) => (

                    <Form noValidate onSubmit={handleSubmit}>
                        {formField("Username:", "input", "Enter username", "username", !!errors.username && touched.username, errors.username, `${urlFOAF}accountName`, "mt-5")}
                        {formField("Password:", "password", "Enter password", "password", !!errors.password && touched.password, errors.password, `${urlOntology}password`)}
                        {this.buttonsDiv(addModalClose)}
                    </Form>  
                )}
                </Formik>   
            :
                <h1 className="d-flex justify-content-center font-weight-bolder mt-5 mb-2 text-info">Welcome {localStorageUser.username}!</h1>  
            } 
            </Container>
            )
        }
    } 

const mapStateToProps = state => {
  return {
        user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
        fetchUser: (username, password) => dispatch(fetchUser(username, password)),
        fetchUserFailure : (error) => dispatch(fetchUserFailure(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)



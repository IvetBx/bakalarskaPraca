import React, { Component} from 'react';
import { Button, FormControl, FormLabel, Form, Alert, Nav} from "react-bootstrap"
import * as yup from "yup"
import { Formik, Field} from "formik"
import RegisterModal from "./RegisterModal"
import { connect } from 'react-redux'
import { fetchUser, fetchUserFailure } from "../../redux/Index"

const urlOntology = "http://www.st.fmph.uniba.sk/~balintova37/ontology/finalOntologyAboutRecipe.owl#"
const urlFOAF = "http://xmlns.com/foaf/0.1/"

const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
  });

class LogIn extends Component{

    constructor(props){
        super(props);
        this.state = {ModalShow : false, username:"", password:"", alertShow : false}
    }

    render(){

        let addModalClose=()=>this.setState({ModalShow : false})
        const localStorageUser = JSON.parse(localStorage.getItem("user"))
        return(
            <div className="container w-25">  
            { this.props.user.error ?  <Alert variant="danger" className="mt-3" onClose={() => this.props.fetchUserFailure("")} dismissible>
                                            <Alert.Heading>You got an error!</Alert.Heading>
                                                <p>{this.props.user.error}</p>
                                        </Alert> : null }
            { !localStorageUser.username ?
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        this.props.fetchUser(values.username, values.password)
                    }}
                    initialValues={{
                        username:"",
                        password:""
                    }}>
                {({ handleSubmit, values, touched, errors, }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group>
                            <FormLabel><Nav.Link href={`${urlFOAF}accountName`} className="text-info font-weight-bold mt-5 p-0">Username:</Nav.Link></FormLabel>
                            <Field placeholder="Enter username" name="username" type="input" as={FormControl} isInvalid={!!errors.username && touched.username} />
                            <Form.Control.Feedback type="invalid"> {errors.username} </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <FormLabel><Nav.Link href={`${urlOntology}password`} className="text-info font-weight-bold p-0">Password:</Nav.Link></FormLabel>
                            <Field placeholder="Enter password" name="password" type="password" as={FormControl} isInvalid={!!errors.password && touched.password} />
                            <Form.Control.Feedback type="invalid"> {errors.password} </Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className="d-flex justify-content-center">
                            <Button variant="success" type="submit" className="mt-2 mr-2">Log In</Button>
                            <Button variant="info" className="mt-2" onClick={() => this.setState({ModalShow:true})}>Create new account</Button>
                            <RegisterModal show={this.state.ModalShow && !this.props.user.error} onHide={addModalClose} />  
                        </div>        
                    </Form>
                )}
                </Formik>   
            :
                <h1 className="d-flex justify-content-center font-weight-bolder mt-5 mb-2 text-info">Welcome {localStorageUser.username}!</h1>  
            } 
            </div>
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



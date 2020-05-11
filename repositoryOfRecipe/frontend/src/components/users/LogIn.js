import React, { Component} from 'react';
import { Button, FormControl, FormLabel, Form} from "react-bootstrap"
import * as yup from "yup"
import { Formik, Field} from "formik"
import RegisterModal from "../modals/RegisterModal"
import { connect } from 'react-redux'
import { fetchUser } from "../../redux/index"

const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
  });

class LogIn extends Component{

    constructor(props){
        super(props);
        this.state = {ModalShow : false, username:"", password:""}
    }

    render(){

        let addModalClose=()=>this.setState({ModalShow : false})
        
        return(
            <div className="container w-25">  
            { !this.props.user.username && !this.props.user.password ?
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
                            <FormLabel className="text-info font-weight-bold mt-5">Username:</FormLabel>
                            <Field placeholder="Enter username" name="username" type="input" as={FormControl} isInvalid={!!errors.username && touched.username} />
                            <Form.Control.Feedback type="invalid"> {errors.username} </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <FormLabel className="text-info font-weight-bold">Password:</FormLabel>
                            <Field placeholder="Enter password" name="password" type="password" as={FormControl} isInvalid={!!errors.password && touched.password} />
                            <Form.Control.Feedback type="invalid"> {errors.password} </Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className="d-flex justify-content-center">
                            <Button variant="success" type="submit" className="mt-2 mr-2">Log In</Button>
                            <Button variant="info" className="mt-2" onClick={() => this.setState({ModalShow:true})}>Create new account</Button>
                            <RegisterModal show={this.state.ModalShow} onHide={addModalClose} />  
                        </div>        
                    </Form>
                )}
                </Formik>   
            :
                <h1 className="d-flex justify-content-center font-weight-bolder mt-5 mb-2 text-info">Welcome {this.props.user.username}!</h1>  
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
        fetchUser: (username, password) => dispatch(fetchUser(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)



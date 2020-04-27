import React, {Component} from "react";
import  { withFormik } from "formik"
import { Modal, Col, Button, Form, FormInput} from "react-bootstrap"
import * as yup from "yup"


var first = true;

const FormCategories = ({
  handleSubmit,
  handleChange,
  values,
  errors,
  isValid
  }) => (
    <Form noValidate onSubmit={handleSubmit} className="font-weight-bolder">
    <Form.Row>
          <Form.Group as={Col} controlId="category">
              <Form.Label>Recipe category:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipe name"
                name="category"
                value={values.category}
                onChange={handleChange}
                isInvalid={!!errors.category}
              />
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
           </Form.Group>
    </Form.Row>
    <div className="d-flex justify-content-end">
      <Button variant="success" type="submit">Save</Button>
    </div>
  </Form>
  )

const FormCategoriesFormik = withFormik({
  mapPropsToValues({category}) {
    return {
      category: category || ""
    }
  },
  handleSubmit(values){
    console.log(values)
  },
  validationSchema:yup.object().shape({
    minTime: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").required(),
    maxTime: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").required()
  })
})(FormCategories)

const Condition = ({state}) => {
    if (first) {
      first = false;
      return <FormCategoriesFormik />;
    }
    return state.inputs.map(input => {
      return <FormCategoriesFormik input/>
 })
}

export default class FilterModalCategories extends Component{

  constructor(props) {
    super(props);
    this.state = { inputs: ["input-0"], first: true };
}


appendInput() {
    var newInput = `input-${this.state.inputs.length}`;
    this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
}

    render(){
        return(
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Assign a filter to categories
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="container">
            <Condition state={this.state} />
           <button onClick={ () => this.appendInput() }>
               CLICK ME TO ADD AN INPUT
           </button>

          </div>

      </Modal.Body>
      <Modal.Footer>
      <Button variant="success" onClick={this.props.onHide}>Save</Button>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>      
      </Modal.Footer>
    </Modal>
        )
    }

} 
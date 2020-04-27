import React, {Component} from "react";
import  { withFormik } from "formik"
import { Modal, Col, Button, Form} from "react-bootstrap"
import * as yup from "yup"

const FormTime = ({
  handleSubmit,
  handleChange,
  values,
  errors,
  isValid
  }) => (
    <Form noValidate onSubmit={handleSubmit}>
    <Form.Row>
          <Form.Group as={Col} md="6" controlId="minTime">
              <Form.Label>Minimum cooking time:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Minimum time (minutes)"
                name="minTime"
                value={values.minTime}
                onChange={handleChange}
                isInvalid={!!errors.minTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.minTime}
              </Form.Control.Feedback>
           </Form.Group>

           <Form.Group as={Col} md="6" controlId="maxTime">
              <Form.Label>Maximum cooking time:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Maximum time (minutes)"
                name="maxTime"
                value={values.maxTime}
                onChange={handleChange}
                isInvalid={!!errors.maxTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.maxTime}
              </Form.Control.Feedback>
           </Form.Group>

    </Form.Row>
    <div className="d-flex justify-content-end">
      <Button variant="success" type="submit">Save</Button>
    </div>
  </Form>
  )

const FormTimeFormik = withFormik({
  mapPropsToValues({minTime, maxTime}) {
    return {
      minTime:minTime || "",
      maxTime:maxTime || ""
    }
  },
  handleSubmit(values){
    console.log(values)
  },
  validationSchema:yup.object().shape({
    minTime: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").required(),
    maxTime: yup.number().typeError("Must be a number").integer("Must be integer").positive("Must be positive number").required()
  })
})(FormTime)


export default class FilterModalCookingTime extends Component{

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
           Assign a filter to cooking time
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <div className="container">
              <FormTimeFormik />
          </div>
      </Modal.Body>

      <Modal.Footer>
      </Modal.Footer>

    </Modal>
        )
    }

} 
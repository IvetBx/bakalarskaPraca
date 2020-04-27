import React, {Component} from "react";
import  { withFormik } from "formik"
import { Modal, Col, Button, Form} from "react-bootstrap"

const FormRating = ({
  handleSubmit,
  handleChange,
  values,
  }) => (
    <Form noValidate onSubmit={handleSubmit}>
    <Form.Row>
        <Form.Group as={Col} controlId="minRating">
        <Form.Label>Minumum rating value:</Form.Label>
        <Form.Control as="select" value={values.minRating} onChange={handleChange} custom>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="maxRating" >
        <Form.Label>Maximum rating value:</Form.Label>
        <Form.Control as="select" value={values.maxRating} onChange={handleChange} custom>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Control>
      </Form.Group>
    </Form.Row>
    <div className="d-flex justify-content-end">
      <Button variant="success" type="submit">Save</Button>
    </div>
  </Form>
  )

const FormRatingFormik = withFormik({
  mapPropsToValues({minRating, maxRating}) {
    return {
      minRating:minRating || "1",
      maxRating:maxRating || "5"
    }
  },
  handleSubmit(values){
    console.log(values)
  }
})(FormRating)

export default class FilterModalRatings extends Component{

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
              Assign a filter to ratings
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

            <div className="container">
              <FormRatingFormik />
            </div>

      </Modal.Body>

      <Modal.Footer>
      </Modal.Footer>

    </Modal>
        )
    }
} 


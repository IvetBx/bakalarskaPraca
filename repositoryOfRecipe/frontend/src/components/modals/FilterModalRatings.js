import React from "react";
import  { Formik } from "formik"
import { Modal, Col, Button, Form} from "react-bootstrap"
import { connect } from 'react-redux'
import {setMinRating, setMaxRating} from "../../redux"

function FilterModalCookingTime (props) {

  const createFormular = () => {
    return (
      <div>
        <Formik
            validateOnChange={false}
            initialValues={{
              minRating:(props && props.min_rating) || "", 
              maxRating:(props && props.max_rating) || ""
            }}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
                props.set_min_rating(data.minRating)
                props.set_max_rating(data.maxRating)
              setSubmitting(false);
            }}
        >
            {({ values, handleSubmit, handleChange }) => 
                <Form onSubmit={handleSubmit}>
                <Form.Row>
                      <Form.Group as={Col} md="6" controlId="minRating">
                          <Form.Label>Minumum rating value:</Form.Label>
                          <Form.Control as="select" value={values.minRating} onChange={handleChange} custom>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Form.Control>
                      </Form.Group>
            
                      <Form.Group as={Col} md="6" controlId="maxRating">
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
                <Modal.Title id="contained-modal-title-vcenter"> Assign a filter to ratings </Modal.Title>
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
      min_rating: state.recipes.minRating,
      max_rating: state.recipes.maxRating
  }
}

const mapDispatchToProps = dispatch => {
  return {
      set_min_rating: (rating) => dispatch(setMinRating(rating)),
      set_max_rating: (rating) => dispatch(setMaxRating(rating))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterModalCookingTime)


import React, {Component} from "react";
import {Modal, Button, Row, Col} from "react-bootstrap";

export default class FilterModalAuthors extends Component{

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
            Assign a filter to authors
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
            
            <Row>

                <Col sm={6}>
                    <h2>Ahoj</h2>
                </Col>

            </Row>

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
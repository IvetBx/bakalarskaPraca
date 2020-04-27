import React, { Component } from 'react';
import {Table, Nav} from "react-bootstrap";

export default class InformationAbout extends Component{

    constructor(props){
        super(props);
    }

    render(){

        return(

            <div className="container">
                <h4 className="m-3 d-flex justify-content-center font-weight-bold">More information about</h4>
                <h1 className="m-3 d-flex justify-content-center font-weight-bold">{this.props.name}</h1>

                <Table className="mt-3" striped border hover responsive size="sm">

                <thead>
                    <tr>
                        <th className="pt-3 pb-3">Property</th>
                        <th className="pt-3 pb-3">Object</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <Nav.Item>
                            <Nav.Link href="/">property</Nav.Link>
                        </Nav.Item>
                        </td>
                        <td>
                        <Nav.Item>
                            <Nav.Link href="/">object</Nav.Link>
                        </Nav.Item>
                        </td>
                    </tr>
                </tbody>
                </Table>
            </div>

        )
    }
}
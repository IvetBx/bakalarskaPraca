import React, { Component } from 'react';
import {Table, Nav} from "react-bootstrap";

export default class ListOf extends Component{

    constructor(props){
        super(props);

    }

    render(){

        return(

            <div className="container">
                <h2 className="m-3 d-flex justify-content-center font-weight-bold">List of all {this.props.name}</h2>
                <Table className="mt-3" striped border hover responsive size="sm">

                <thead>
                    <tr>
                        <th className="pt-3 pb-3">Label</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <Nav.Item>
                            <Nav.Link href={`/listOf/${this.props.url}/item`}>item</Nav.Link>
                        </Nav.Item>
                        </td>
                    </tr>
                </tbody>
                </Table>
            </div>

        )
    }
}
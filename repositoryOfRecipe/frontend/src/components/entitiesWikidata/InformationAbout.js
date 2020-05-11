import React from 'react';
import {Table, Nav} from "react-bootstrap";
import { connect } from "react-redux"


function InformationAbout ({wikidataList}) {

        return(
            <div className="container">
                <h4 className="m-3 d-flex justify-content-center font-weight-bold">More information about</h4>
                <h1 className="m-3 d-flex justify-content-center font-weight-bold">{wikidataList.entityName}</h1>

                <Table className="mt-3" striped border hover responsive size="sm">

                <thead>
                    <tr>
                        <th className="pt-3 pb-3">Property</th>
                        <th className="pt-3 pb-3">Value</th>
                    </tr>
                </thead>
                <tbody>
                        { wikidataList.moreInfoAboutEntity.map((entity) => {
                            return (
                                <tr key={Math.random()} >
                                    <td>
                                        <Nav.Item>
                                            <Nav.Link href={entity.property}>{entity.labelProperty}</Nav.Link>
                                        </Nav.Item>
                                    </td>
                                    <td>
                                        <Nav.Item>
                                            <Nav.Link href={entity.object}>{entity.objectLabel}</Nav.Link>
                                        </Nav.Item>
                                    </td>
                                </tr>
                            )
                            })
                        }
                </tbody>
                </Table>
            </div>
        )
}

const mapStateToProps = state => {
    return {
        wikidataList: state.wikidataList,
    }
}

export default connect(mapStateToProps)(InformationAbout)

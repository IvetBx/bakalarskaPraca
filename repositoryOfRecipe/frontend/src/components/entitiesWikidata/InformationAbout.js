import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import { connect } from "react-redux"
import { fetchMoreInfoAboutWikidataEntity } from "../../redux/Index"
import {loading, displayError, fieldTdTable, fieldThTable} from "./commonComponents"

class InformationAbout extends Component {

        componentDidMount(){
            const id = this.props.match.params.id
            const entity = this.props.match.params.entity
            this.props.fetchMoreInfoAboutWikidataEntity(id, entity) 
        }

        render(){
            return(
                <div className="container">
                    <h2 className="m-3 mt-5 d-flex justify-content-center font-weight-bold text-info">More information</h2>
                    { loading(this.props.wikidataList.loading) }
                    { displayError(this.props.wikidataList.error, this.props.wikidataList.error) }
                    
                    <Table className="mt-3" striped hover responsive size="sm">
                    { fieldThTable(["Property", "Value"]) }
                    <tbody>
                            { this.props.wikidataList.moreInfoAboutEntity && this.props.wikidataList.moreInfoAboutEntity.map((entity, index) => {
                                return (
                                    <tr key={index} >
                                        { fieldTdTable(entity.property, entity.labelProperty) }
                                        { fieldTdTable(entity.object, entity.objectLabel) }
                                    </tr>
                                )
                                })
                            }
                    </tbody>
                    </Table>
                </div>
            )
        }
}

const mapStateToProps = state => {
    return {
        wikidataList: state.wikidataList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMoreInfoAboutWikidataEntity: (uri, label) => dispatch(fetchMoreInfoAboutWikidataEntity(uri, label))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InformationAbout)

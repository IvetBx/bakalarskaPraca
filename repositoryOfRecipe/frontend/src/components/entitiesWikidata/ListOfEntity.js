import React, {Component} from 'react';
import {Container, Button, Table} from "react-bootstrap"
import { connect } from "react-redux"
import { fetchWikidataList } from "../../redux/Index"
import {loading, displayError, fieldThTable} from "./commonComponents"

class ListOfEntity extends Component {

        componentDidMount(){
            this.props.fetchWikidataList(this.props.entity)
        }

        render(){
                return (
                <Container>
                    <h2 className="m-3 mt-5 d-flex justify-content-center font-weight-bold text-info">List of all {this.props.entityPlural}</h2>

                    <Container>
                        { loading(this.props.wikidataList.loading) }
                        { displayError(this.props.wikidataList.error, this.props.wikidataList.error) }
                    </Container>
                    
                    <Table className="mt-3" striped hover responsive size="sm">
                        {fieldThTable([`Name of ${this.props.entitySingular}`])}                        
                        <tbody>
                        {this.props.wikidataList.wikidataList.map((entity) => {
                            if(entity.label){
                                return (
                                    <tr key={entity.uri}><td>
                                        <Button variant="link" onClick={() => 
                                            {var splitUri = entity.uri.split("/"); 
                                            this.props.history.push(`/listOf/${this.props.entity}/${splitUri[splitUri.length-1]}`)}
                                            }>{entity.label}</Button>
                                    </td></tr>
                                )}
                            })
                        }
                        </tbody>
                    </Table>
                </Container>
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
        fetchWikidataList: (entity) => dispatch(fetchWikidataList(entity)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfEntity)







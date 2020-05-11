import React, {Component} from 'react';
import {Container, Button, Spinner, Table, Nav} from "react-bootstrap"
import { connect } from "react-redux"
import { fetchWikidataList, fetchMoreInfoAboutWikidataEntity } from "../../redux/index"
import { useHistory } from 'react-router-dom';
import InformationAbout from './InformationAbout';
import Recipe from '../recipes/Recipe';

class ListOfEntityFromWikidata extends Component {

        componentDidMount(){
            this.props.fetchWikidataList(this.props.entity)
        }


        render(){
            if(this.props.wikidataList.entityName === ""){
                return (
                    <div className="container">
                    <h2 className="m-3 d-flex justify-content-center font-weight-bold">List of all {this.props.entityPlural}</h2>
                    <Container>
                    { this.props.wikidataList.loading && <div className="d-flex justify-content-center"><Spinner animation="border" variant="dark"/></div> }
                    { this.props.wikidataList.error && <h2>{this.props.wikidataList.error}</h2> }
                    </Container>
                    
                    <Table className="mt-3" striped border hover responsive size="sm">

                    <thead>
                        <tr>
                            <th className="pt-3 pb-3">Name of {this.props.entitySingular}</th>
                        </tr>
                    </thead>
                    <tbody>
                     {this.props.wikidataList.wikidataList.map((entity) => {
                            return (
                                <tr key={entity.uri}><td>
                                    <Button variant="link" onClick={() => {this.props.fetchMoreInfoAboutWikidataEntity(entity.uri, entity.label)}}>{entity.label}</Button>
                                </td>
                                </tr>
                            )
                            })
                        }
                    </tbody>
                    </Table>
                </div>
            )
            } else{
                return <InformationAbout />
            }
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
        fetchMoreInfoAboutWikidataEntity: (uri, label) => dispatch(fetchMoreInfoAboutWikidataEntity(uri, label))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfEntityFromWikidata)







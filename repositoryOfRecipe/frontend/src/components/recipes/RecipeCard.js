import React, {Component} from 'react'
import {Card, Button, Row, Col} from "react-bootstrap"
import { fetchDetailAboutRecipe, deleteRecipe } from "../../redux/Index"
import { connect } from "react-redux"
import { withRouter } from 'react-router'

class RecipeCard extends Component {

    render(){
        const label = this.props.recipe.label
        const description = this.props.recipe.hasDescription
        return(
            <Card bg={"light"} className="mt-3">
             <Card.Header><Row><Col sm="8"><h4 className="text-dark font-weight-bold">{label}</h4></Col>
             {this.props.myRecipes ? 
                     <Col sm="4">
                         <Button variant="info" size="sm  mr-2" className="font-weight-bold" 
                            onClick={()=> {var splitUri = this.props.recipe.uri.split("#"); 
                            this.props.history.push(`/createRecipe/${splitUri[splitUri.length-1]}`)
                            }}>Update</Button>
                         <Button variant="danger" size="sm  mr-2" className="font-weight-bold" 
                            onClick={()=> {this.props.deleteRecipe(localStorage.getItem("user"), this.props.recipe.uri);
                            }}>Delete</Button>                 
                     </Col>
                     : null}
                     </Row>
             
             </Card.Header>
                     <Card.Body>
                         <Card.Text> {description} </Card.Text>
                         <Button variant="link" onClick={() => {var splitUri = this.props.recipe.uri.split("#"); 
                                            this.props.history.push(`/recipes/${splitUri[splitUri.length-1]}`)
                                            }}>Read more...</Button>
                     </Card.Body>
             </Card>   
         )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailAboutRecipe: (uri) => dispatch(fetchDetailAboutRecipe(uri)),
        deleteRecipe: (user, uri) => dispatch(deleteRecipe(user, uri))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(RecipeCard))

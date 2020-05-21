import React from 'react'
import {Card, Button} from "react-bootstrap"
import { fetchDetailAboutRecipe } from "../../redux/Index"
import { connect } from "react-redux"

function RecipeCard (props){

    const label = props.recipe.label
    const description = props.recipe.hasDescription

    return(
       <Card bg={"light"} className="mt-3">
        <Card.Header><h4 className="text-dark font-weight-bold">{label}</h4></Card.Header>
                <Card.Body>
                    <Card.Text> {description} </Card.Text>
                    <Button variant="link" onClick={() => {props.fetchDetailAboutRecipe(props.recipe.uri)}}>Read more...</Button>
                </Card.Body>
        </Card>   
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailAboutRecipe: (uri) => dispatch(fetchDetailAboutRecipe(uri))
    }
}

export default connect(null, mapDispatchToProps)(RecipeCard)

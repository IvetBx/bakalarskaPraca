import React, { Component } from 'react';
import RecipeCard from "./RecipeCard"
import {Container, Row, Col } from "react-bootstrap"
import { connect } from "react-redux"
import { fetchRecipesFromAuthor } from "../../redux/Index"
import {cantDisplay, loading, displayError} from "./commonComponents"


class UsersRecipes extends Component {

    componentDidMount(){
        const localStorageUser = JSON.parse(localStorage.getItem("user"))
        this.props.fetchRecipesFromAuthor(localStorageUser.username)
    }  

    componentDidUpdate(){
        if(this.props.recipeData.deleteRecipe){
            const localStorageUser = JSON.parse(localStorage.getItem("user"))
            this.props.fetchRecipesFromAuthor(localStorageUser.username)        
        }
    }

    render(){
            const localStorageUser = JSON.parse(localStorage.getItem("user"))
            return( 
                    (!localStorageUser.username) ?  
                        cantDisplay("You can't display your own recipe", "You should log in")
                    :
                    <Container className="mb-5">
                        <h1 className="d-flex justify-content-center font-weight-bolder mt-5 mb-5 text-info">My recipes</h1>
                        {loading(this.props.recipeData.loading)}
                        {displayError(this.props.recipeData.error, this.props.recipeData.error)}
                        <Row>
                            { this.props.recipeData.filterRecipes && this.props.recipeData.filterRecipes.length ? 
                                this.props.recipeData.filterRecipes.map((recipe) => <Col sm={6} key={recipe.uri}><RecipeCard recipe={recipe} myRecipes={true} /></Col>) 
                            : !this.props.recipeData.loading && !this.props.recipeData.error ?
                                <h2 className="d-flex text-muted">You don't have any recipes.</h2>
                            : null  
                            }
                        </Row>
                    </Container>
                )
        } 
}

const mapStateToProps = state => {
    return {
        recipeData: state.recipes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRecipesFromAuthor: (author) => dispatch(fetchRecipesFromAuthor(author))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersRecipes)
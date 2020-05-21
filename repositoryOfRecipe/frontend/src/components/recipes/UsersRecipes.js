import React, { useEffect } from 'react';
import RecipeCard from "./RecipeCard"
import {Container, Row, Col, Spinner} from "react-bootstrap"
import { connect } from "react-redux"
import { fetchRecipesFromAuthor } from "../../redux/Index"
import Recipe from "./Recipe"


function UsersRecipes({ recipeData, fetchRecipesFromAuthor }) {

    const localStorageUser = JSON.parse(localStorage.getItem("user"))

    useEffect(() => { fetchRecipesFromAuthor(localStorageUser.username) }, [])

    if(recipeData.recipeDetail.length === 0){
        return( 
                (!localStorageUser.username) ?  
                    <div>
                        <h2 className="d-flex justify-content-center font-weight-bolder mt-5 mb-2 text-danger">You can't display your own recipe</h2>
                        <h1 className="d-flex justify-content-center font-weight-bolder mb-2 text-info">You should log in</h1>
                    </div>
                :
                <Container>
                    <h1 className="d-flex justify-content-center font-weight-bolder mt-5 mb-5 text-info">My recipes</h1>
                    { recipeData.loading && <div className="d-flex justify-content-center"><Spinner animation="border" variant="dark"/></div> }
                    <Row>
                    { recipeData.error && <h2>{recipeData.error}</h2> }
                    { recipeData && recipeData.filterRecipes ? 
                        recipeData.filterRecipes.map((recipe) => <Col sm={6} key={recipe.uri}><RecipeCard recipe={recipe} /></Col>) 
                    :
                        <h2 className="d-flex justify-content-center text-muted">You don't have any recipes.</h2>
                    }
                    </Row>

                </Container>
            )
    } else {
        return <Recipe />
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
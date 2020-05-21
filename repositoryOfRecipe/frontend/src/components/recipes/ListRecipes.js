import React, { useEffect } from 'react';
import RecipeCard from "./RecipeCard"
import {Container, Row, Col, Spinner} from "react-bootstrap"
import Filters from "./filters/Filters"
import { connect } from "react-redux"
import { fetchRecipes } from "../../redux/Index"
import Recipe from "./Recipe"


function ListRecipes({ recipeData, fetchRecipes }) {

    useEffect(() => { fetchRecipes() }, [])

    if(recipeData.recipeDetail.length === 0){
        return(
            <div>                
                <Filters />
                <Container>
                    { recipeData.loading && <div className="d-flex justify-content-center"><Spinner animation="border" variant="dark"/></div> }
                    <Row>
                    
                    { recipeData.error && <h2>{recipeData.error}</h2> }
                    { recipeData && recipeData.filterRecipes ? 
                        recipeData.filterRecipes.map((recipe) => <Col sm={6} key={recipe.uri}><RecipeCard recipe={recipe} /></Col>) 
                        :
                        recipeData.recipes.map((recipe) => <Col sm={6} key={recipe.uri}><RecipeCard recipe={recipe} /></Col>) 
                    }
                    </Row>
                </Container>
            </div>
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
        fetchRecipes: () => dispatch(fetchRecipes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListRecipes)

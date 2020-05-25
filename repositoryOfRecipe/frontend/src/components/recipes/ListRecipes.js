import React, { Component } from 'react';
import RecipeCard from "./RecipeCard"
import { Container, Row, Col } from "react-bootstrap"
import Filters from "./filters/Filters"
import { connect } from "react-redux"
import { fetchRecipes } from "../../redux/Index"
import {loading, displayError} from "./commonComponents"

class ListRecipes extends Component {

    componentDidMount(){
        this.props.fetchRecipes()
    }    

    render(){
            return(
                <div>                
                    <Filters />
                    <Container className="mb-5">
                        { loading(this.props.recipeData.loading) }
                        { displayError(this.props.recipeData.error, this.props.recipeData.error) }
                        <Row>
                        { this.props.recipeData.filterRecipes ? 
                            this.props.recipeData.filterRecipes.map((recipe) => <Col sm={6} key={recipe.uri}><RecipeCard recipe={recipe} /></Col>) 
                            :
                            this.props.recipeData.recipes.map((recipe) => <Col sm={6} key={recipe.uri}><RecipeCard recipe={recipe} /></Col>) 
                        }
                        </Row>
                    </Container>
                </div>
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
        fetchRecipes: () => dispatch(fetchRecipes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListRecipes)

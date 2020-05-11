import React, { Component } from 'react';
import {Button, ButtonToolbar, Row, Col} from "react-bootstrap";
import FilterModalExcludedIncluded from "../modals/FilterModalExcludedIncluded"
import FilterModalRatings from "../modals/FilterModalRatings"
import FilterModalCookingTime from "../modals/FilterModalCookingTime"
import { connect } from 'react-redux'
import { fetchRecipesWithFilters, removeFilters } from "../../redux"

class Filters extends Component{

  constructor(props){
    super(props);
    this.state = {deps:[], ModalAuthorsShow : false, ModalCategoriesShow : false, ModalCookingMethodsShow : false, ModalCookingTimeShow : false
      , ModalCuisinesShow : false, ModalKitchenwareShow : false, ModalIngredientsShow : false, ModalRatingsShow : false}
}

  render(){

    let addModalClose=()=>this.setState({ModalCategoriesShow : false, ModalAuthorsShow : false, ModalCookingMethodsShow : false, ModalCookingTimeShow : false
      , ModalCuisinesShow : false, ModalKitchenwareShow : false, ModalIngredientsShow : false, ModalRatingsShow : false})

    return (
      <div>
        <div className="row bg-dark justify-content-md-center pt-3">
            <ButtonToolbar className="col-md-auto">
              <Button variant="dark"  className="text-uppercase" onClick={()=> this.setState({ModalAuthorsShow:true})}> Authors </Button>
              <FilterModalExcludedIncluded 
                    show={this.state.ModalAuthorsShow}
                    onHide={addModalClose}
                    singular="author"
                    plural="authors"
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalCategoriesShow:true})}> Categories </Button>
              <FilterModalExcludedIncluded 
                    show={this.state.ModalCategoriesShow}
                    onHide={addModalClose}
                    singular="category"
                    plural="categories"
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalCookingMethodsShow : true})}> Cooking methods </Button>
              <FilterModalExcludedIncluded 
                    show={this.state.ModalCookingMethodsShow}
                    onHide={addModalClose}
                    singular="cooking method"
                    plural="cooking methods"
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalCookingTimeShow:true})}> Cooking time </Button>
              <FilterModalCookingTime 
                    show={this.state.ModalCookingTimeShow}
                    onHide={addModalClose}
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalCuisinesShow:true})}> Cuisines </Button>
              <FilterModalExcludedIncluded 
                    show={this.state.ModalCuisinesShow}
                    onHide={addModalClose}
                    singular="cuisine"
                    plural="cuisines"
                    />   
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalKitchenwareShow:true})}> Kitchenware </Button>
              <FilterModalExcludedIncluded 
                    show={this.state.ModalKitchenwareShow}
                    onHide={addModalClose}
                    singular="kitchenware"
                    plural="kitchenware"
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalIngredientsShow:true})}> Ingredients </Button>
              <FilterModalExcludedIncluded 
                    show={this.state.ModalIngredientsShow}
                    onHide={addModalClose}
                    singular="ingredient"
                    plural="ingredients"
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalRatingsShow:true})}> Ratings </Button>
              <FilterModalRatings 
                    show={this.state.ModalRatingsShow}
                    onHide={addModalClose}
                    />  
            </ButtonToolbar>
            </div>

            <Row className="bg-dark pt-2 pb-4">
            <Col></Col>
            <Col xs={9}>
              <div className="d-flex justify-content-center">
                <Button variant="info" size="sm  mr-2 mt-2" className="font-weight-bold"
                onClick={()=> this.props.fetch_recipes_with_filters(this.props.recipes_data.minTime, this.props.recipes_data.maxTime, this.props.recipes_data.minRating, this.props.recipes_data.maxRating, this.props.recipes_data.inAuthors, this.props.recipes_data.exAuthors, 
                  this.props.recipes_data.inCategories, this.props.recipes_data.exCategories, this.props.recipes_data.inMethods, this.props.recipes_data.exMethods, this.props.recipes_data.inCuisines, this.props.recipes_data.exCuisines, 
                  this.props.recipes_data.inKitchenware, this.props.recipes_data.exKitchenware, this.props.recipes_data.inIngredients, this.props.recipes_data.exIngredients)}> Apply filters together </Button>{' '}
                <Button variant="info" size="sm  mr-2 mt-2" className="font-weight-bold"> Apply filters individually </Button>{' '}
                <Button variant="danger" size="sm  mr-2 mt-2" className="font-weight-bold" onClick={()=> this.props.removeFilters()}> Remove filters </Button>
            </div>
            </Col>
            <Col></Col>
          </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes_data: state.recipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetch_recipes_with_filters: (minTime, maxTime, minRating, maxRating, inAuthors, exAuthors, inCategories, exCategories, inMethods, exMethods,
        inCuisines, exCuisines, inKitchenware, exKitchenware, inIngredients, exIngredients) => 
      dispatch(fetchRecipesWithFilters(minTime, maxTime, minRating, maxRating, inAuthors, exAuthors, inCategories, exCategories, inMethods, exMethods,
        inCuisines, exCuisines, inKitchenware, exKitchenware, inIngredients, exIngredients)),

      removeFilters: () => dispatch(removeFilters())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)



import React, { Component } from 'react';
import {Button, ButtonToolbar, Row, Col} from "react-bootstrap";
import FilterModalAuthors from "./modals/FilterModalAuthors";
import FilterModalCategories from "./modals/FilterModalCategories"
import FilterModalCookingMethods from "./modals/FilterModalCookingMethods"
import FilterModalCookingTime from "./modals/FilterModalCookingTime"
import FilterModalCuisines from "./modals/FilterModalCuisines"
import FilterModalKitchenware from "./modals/FilterModalKitchenware"
import FilterModalIngredients from "./modals/FilterModalIngredients"
import FilterModalRatings from "./modals/FilterModalRatings"

export default class Filters extends Component{

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
              <FilterModalAuthors 
                    show={this.state.ModalAuthorsShow}
                    onHide={addModalClose}
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalCategoriesShow:true})}> Categories </Button>
              <FilterModalCategories 
                    show={this.state.ModalCategoriesShow}
                    onHide={addModalClose}
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalCookingMethodsShow : true})}> Cooking methods </Button>
              <FilterModalCookingMethods
                    show={this.state.ModalCookingMethodsShow}
                    onHide={addModalClose}
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
              <FilterModalCuisines 
                    show={this.state.ModalCuisinesShow}
                    onHide={addModalClose}
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalKitchenwareShow:true})}> Kitchenware </Button>
              <FilterModalKitchenware 
                    show={this.state.ModalKitchenwareShow}
                    onHide={addModalClose}
                    />  
            </ButtonToolbar>

            <ButtonToolbar className="col-md-auto">
              <Button variant="dark" className="text-uppercase" onClick={()=> this.setState({ModalIngredientsShow:true})}> Ingredients </Button>
              <FilterModalIngredients 
                    show={this.state.ModalIngredientsShow}
                    onHide={addModalClose}
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
                <Button variant="info" size="sm  mr-2 mt-2" className="font-weight-bold"> Apply filters together </Button>{' '}
                <Button variant="info" size="sm  mr-2 mt-2" className="font-weight-bold"> Apply filters individually </Button>{' '}
                <Button variant="danger" size="sm  mr-2 mt-2" className="font-weight-bold"> Remove filters </Button>
            </div>
            </Col>
            <Col></Col>
          </Row>
      </div>
)
  }
}



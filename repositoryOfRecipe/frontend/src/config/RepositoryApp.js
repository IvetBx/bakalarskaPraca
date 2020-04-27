import React, { Component } from 'react';
import ListRecipes from '../components/ListRecipes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipeComponent from '../components/Recipe';
import ListOf from "../components/ListOf"
import InformationAbout from '../components/InformationAbout';
import User from "../components/users/User"
import CreateRecipe from "../components/CreateRecipe"

export default class RepositoryApp extends Component {

    render() {
        return (
        <Router>
              <React.Fragment>
              <Switch>
                  
                        <Route path="/" exact component={ListRecipes} />
                        <Route path="/recipes" exact component={ListRecipes} />
                        <Route path="/recipes/:id" component={RecipeComponent} />
                        <Route path="/listOf/ingredients" exact render={(props) => <ListOf {...props} name="ingredients" url="ingredients"/>}/>
                        <Route path="/listOf/kitchenware" exact render={(props) => <ListOf {...props} name="kitchenware" url="kitchenware"/>}/>
                        <Route path="/listOf/cookingMethods" exact render={(props) => <ListOf {...props} name="cooking methods" url="cookingMethods"/>}/>
                        <Route path="/listOf/cuisines" exact render={(props) => <ListOf {...props} name="cuisines" url="cuisines"/>}/>
                        <Route path="/listOf/ingredients/:id" exact render={(props) => <InformationAbout {...props} name="itemIngr" />}/>
                        <Route path="/listOf/kitchenware/:id" exact render={(props) => <InformationAbout {...props} name="itemKitchen" />}/>
                        <Route path="/listOf/cookingMethods/:id" exact render={(props) => <InformationAbout {...props} name="itemMethod" />}/>
                        <Route path="/listOf/cuisines/:id" exact render={(props) => <InformationAbout {...props} name="itemCuisine" />}/>
                        <Route path="/users/:id" exact render={(props) => <User {...props} />}/>
                        <Route path="/myRecipes" exact component={ListRecipes}/>
                        <Route path="/createRecipe" exact component={CreateRecipe}/>

                </Switch>              
                </React.Fragment>

            </Router>

        )
    }

}

import React, { Component } from 'react';
import ListRecipes from '../components/recipes/ListRecipes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Recipe from '../components/recipes/Recipe';
import ListOfEntity from "../components/entitiesWikidata/ListOfEntity"
import InformationAbout from '../components/entitiesWikidata/InformationAbout';
import CreateRecipe from "../components/recipes/CreateRecipe"
import UsersRecipes from "../components/recipes/UsersRecipes"
import LogIn from "../components/users/LogIn"

export default class RepositoryApp extends Component {


    render() {
        return (
        <BrowserRouter>
              <Switch>
                        <Route path="/" exact component={ListRecipes} />
                        <Route path="/recipes" exact component={ListRecipes} />
                        <Route path="/recipes/:id" component={Recipe} />
                        <Route path="/listOf/cookingMethod" exact render={(props) => <ListOfEntity {...props} entity="cookingMethod" entitySingular="cooking method" entityPlural="cooking methods"/>}/>
                        <Route path="/listOf/cuisine" exact render={(props) => <ListOfEntity {...props} entity="cuisine" entitySingular="cuisine" entityPlural="cuisines"/>}/>
                        <Route path="/listOf/kitchenware" exact render={(props) => <ListOfEntity {...props} entity="kitchenware" entitySingular="kitchenware" entityPlural="kitchenware"/>}/>
                        <Route path="/listOf/food" exact render={(props) => <ListOfEntity {...props} entity="food" entitySingular="food" entityPlural="food" />}/>
                        <Route path="/listOf/:entity/:id" exact render={(props) => <InformationAbout {...props} />}/>
                        <Route path="/myRecipes" exact component={UsersRecipes}/>
                        <Route path="/createRecipe/:id" component={CreateRecipe}/>
                        <Route path="/logIn" exact component={LogIn} />

                </Switch>              
            </BrowserRouter>

        )
    }

}

import React, { Component } from 'react';
import ListRecipes from '../components/recipes/ListRecipes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipeCard from '../components/recipes/RecipeCard';
import ListOfEntityFromWikidata from "../components/entitiesWikidata/ListOfEntityFromWikidata"
import InformationAbout from '../components/entitiesWikidata/InformationAbout';
import CreateRecipe from "../components/recipes/CreateRecipe"
import LogIn from "../components/users/LogIn"

export default class RepositoryApp extends Component {


    render() {
        return (
        <BrowserRouter>
              <Switch>
                  
                        <Route path="/" exact component={ListRecipes} />
                        <Route path="/recipes" exact component={ListRecipes} />
                        <Route path="/recipes/:id" component={RecipeCard} />
                        <Route path="/listOf/cookingMethod" exact render={(props) => <ListOfEntityFromWikidata {...props} entity="cookingMethod" entitySingular="cooking method" entityPlural="cooking methods"/>}/>
                        <Route path="/listOf/cuisine" exact render={(props) => <ListOfEntityFromWikidata {...props} entity="cuisine" entitySingular="cuisine" entityPlural="cuisines"/>}/>
                        <Route path="/listOf/kitchenware" exact render={(props) => <ListOfEntityFromWikidata {...props} entity="kitchenware" entitySingular="kitchenware" entityPlural="kitchenware"/>}/>
                        <Route path="/listOf/food" exact render={(props) => <ListOfEntityFromWikidata {...props} entity="food" entitySingular="food" entityPlural="food" />}/>
                        <Route path="/listOf/:entity/:id" exact render={(props) => <InformationAbout {...props} />}/>

                        <Route path="/myRecipes" exact component={ListRecipes}/>
                        <Route path="/createRecipe" exact component={CreateRecipe}/>
                        <Route path="/logIn" exact component={LogIn} />

                </Switch>              
            </BrowserRouter>

        )
    }

}

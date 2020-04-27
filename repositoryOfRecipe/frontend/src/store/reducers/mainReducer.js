import selectReducer from "./selectReducer"
import loggedReducer from "./loggedReducer"
import recipesReducer from "./recipesReducer"
import {combineReducers} from "redux"

const mainReducer = combineReducers({
    select:selectReducer,
    isLogged:loggedReducer,
    recipes:recipesReducer
})

export default mainReducer
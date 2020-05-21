import recipeReducer from "./reducers/RecipeReducer" 
import {combineReducers} from "redux"
import wikidataReducer from "./reducers/WikidataReducer"
import userReducer from "./reducers/UserReducer"

const rootReducer = combineReducers({
    recipes: recipeReducer,
    wikidataList: wikidataReducer,
    user: userReducer
})

export default rootReducer
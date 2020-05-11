import recipeReducer from "./reducers/recipeReducer" 
import {combineReducers} from "redux"
import wikidataReducer from "./reducers/wikidataReducer"
import userReducer from "./reducers/userReducer"

const rootReducer = combineReducers({
    recipes: recipeReducer,
    wikidataList: wikidataReducer,
    user: userReducer
})

export default rootReducer
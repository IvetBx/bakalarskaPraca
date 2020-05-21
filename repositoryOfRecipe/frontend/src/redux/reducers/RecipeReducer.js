import { FETCH_RECIPES_REQUEST, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE, 
    FETCH_RECIPES_WITH_NAME_SUCCESS, FETCH_RECIPES_WITH_NAME_FAILURE, FETCH_RECIPES_WITH_NAME_REQUEST,
    SET_EXCLUDED_INGREDIENTS, SET_INCLUDED_INGREDIENTS, SET_EXCLUDED_AUTHORS, SET_INCLUDED_AUTHORS, 
    SET_EXCLUDED_CATEGORIES, SET_INCLUDED_CATEGORIES, SET_EXCLUDED_CUISINES, SET_INCLUDED_CUISINES,
    SET_EXCLUDED_KITCHENWARE, SET_INCLUDED_KITCHENWARE, SET_EXCLUDED_METHODS, SET_INCLUDED_METHODS, SET_MAX_TIME, SET_MIN_TIME, 
    FETCH_RECIPES_WITH_FILTERS_FAILURE, FETCH_RECIPES_WITH_FILTERS_SUCCESS, REMOVE_FILTERS, FETCH_DETAIL_ABOUT_RECIPE_FAILURE, 
    FETCH_DETAIL_ABOUT_RECIPE_SUCCESS, FETCH_DETAIL_ABOUT_RECIPE_REQUEST, CREATE_RECIPE_REQUEST, CREATE_RECIPE_SUCCESS, CREATE_RECIPE_FAILURE, SET_RECIPE_DETAIL } from "../types/RecipeTypes"
import {structureOfRecipe} from "../../config/Constant"


const initState={
    loading: false,
    filterRecipes: null,
    recipes: [],
    error: "",
    recipeName: "",
    minTime:"",
    maxTime:"", 
    inAuthors:[], 
    exAuthors:[],
    inCategories:[],
    exCategories:[],
    inMethods:[],
    exMethods:[],
    inCuisines:[],
    exCuisines:[],
    inKitchenware:[],
    exKitchenware:[],
    inIngredients:[], 
    exIngredients:[],
    recipeDetail: "",
    Aall: false,
    CAall: false, 
    Mall : false,
    CUall :false, 
    Kall : false, 
    Iall:false 
}

const recipeReducer=(state=initState, action) => {
    switch(action.type){
        case FETCH_RECIPES_REQUEST:
            return {
                ...state,
                recipeDetail:"",
                loading: true
            }

        case FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                recipeDetail:"",
                recipes: action.payload,
                error: ""
            }

        case FETCH_RECIPES_FAILURE:
            return {
                ...state,
                loading: false,
                recipeDetail:"",
                recipes: [],
                error: action.payload
            }
        
        case FETCH_RECIPES_WITH_NAME_REQUEST:
            return{
                ...state,
                loading: true,
                recipeName: action.recipeName
            }

        case FETCH_RECIPES_WITH_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                filterRecipes: action.payload,
                error: ""
            }
        
        case FETCH_RECIPES_WITH_NAME_FAILURE:
            return {
                ...state,
                loading: false,
                filterRecipes: null,
                error: action.payload
            }

        case SET_INCLUDED_INGREDIENTS:
            return {
                ...state,
                inIngredients: action.payload,
                Iall:action.all
            }

        case SET_EXCLUDED_INGREDIENTS:
            return {
                ...state,
                exIngredients: action.payload
            }

        case SET_INCLUDED_AUTHORS:
            return {
                ...state,
                inAuthors: action.payload,
                Aall: action.all
            }

        case SET_EXCLUDED_AUTHORS:
            return {
                ...state,
                exAuthors: action.payload
            }

        case SET_INCLUDED_CATEGORIES:
            return {
                ...state,
                inCategories: action.payload,
                CAall: action.all
            }

        case SET_EXCLUDED_CATEGORIES:
            return {
                ...state,
                exCategories: action.payload
            }

        case SET_INCLUDED_CUISINES:
            return {
                ...state,
                inCuisines: action.payload,
                CUall : action.all
            }

        case SET_EXCLUDED_CUISINES:
            return {
                ...state,
                exCuisines: action.payload
            }

        case SET_INCLUDED_KITCHENWARE:
            return {
                ...state,
                inKitchenware: action.payload,
                Kall : action.all 
            }

        case SET_EXCLUDED_KITCHENWARE:
            return {
                ...state,
                exKitchenware: action.payload
            }

        case SET_INCLUDED_METHODS:
            return {
                ...state,
                inMethods: action.payload,
                Mall : action.all
            }

        case SET_EXCLUDED_METHODS:
            return {
                ...state,
                exMethods: action.payload
            }
        
        case SET_MIN_TIME:
            return {
                ...state,
                minTime: action.payload
            }

        case SET_MAX_TIME:
            return {
                ...state,
                maxTime: action.payload
            }

        case FETCH_RECIPES_WITH_FILTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                filterRecipes: action.payload,
                error: ""
            }

        case FETCH_RECIPES_WITH_FILTERS_FAILURE:
            return {
                ...state,
                loading: false,
                filterRecipes: null,
                error: action.payload
            }
        
        case REMOVE_FILTERS:
            return {
                ...state,
                filterRecipes: null,
                recipeDetail:"",
                recipeName: "",
                minTime:"",
                maxTime:"", 
                inAuthors:[], 
                exAuthors:[],
                inCategories:[],
                exCategories:[],
                inMethods:[],
                exMethods:[],
                inCuisines:[],
                exCuisines:[],
                inKitchenware:[],
                exKitchenware:[],
                inIngredients:[], 
                exIngredients:[],
                Aall: false,
                CAall: false, 
                Mall : false,
                CUall :false, 
                Kall : false, 
                Iall:false 
            }

            case SET_RECIPE_DETAIL:
                return {
                    ...state,
                    recipeDetail: action.payload
                }

            case CREATE_RECIPE_REQUEST:
                return {
                    ...state,
                    loading: true,
                    recipeDetail: action.payload
                }

            case CREATE_RECIPE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    recipeDetail: action.payload,
                    error: ""
                }

            case CREATE_RECIPE_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            

            case FETCH_DETAIL_ABOUT_RECIPE_REQUEST:
                return {
                    ...state,
                    loading: true
                }
    
            case FETCH_DETAIL_ABOUT_RECIPE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    recipeDetail: action.payload,
                    error: ""
                }
    
            case FETCH_DETAIL_ABOUT_RECIPE_FAILURE:
                return {
                    ...state,
                    loading: false,
                    recipeDetail: [],
                    error: action.payload
                }

            

        default:
            return state
    }
}

export default recipeReducer
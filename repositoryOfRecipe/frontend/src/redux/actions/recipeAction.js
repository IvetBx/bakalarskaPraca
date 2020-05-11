import axios from "axios"
import { FETCH_RECIPES_REQUEST, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE,
    FETCH_RECIPES_WITH_NAME_SUCCESS, FETCH_RECIPES_WITH_NAME_FAILURE, FETCH_RECIPES_WITH_NAME_REQUEST, 
    SET_INCLUDED_INGREDIENTS, SET_EXCLUDED_INGREDIENTS, SET_EXCLUDED_AUTHORS, SET_INCLUDED_AUTHORS, 
    SET_EXCLUDED_CATEGORIES, SET_INCLUDED_CATEGORIES, SET_EXCLUDED_CUISINES, SET_INCLUDED_CUISINES,
    SET_EXCLUDED_KITCHENWARE, SET_INCLUDED_KITCHENWARE, SET_EXCLUDED_METHODS, SET_INCLUDED_METHODS,
    SET_MIN_TIME,  SET_MAX_TIME, SET_MAX_RATING, SET_MIN_RATING, FETCH_RECIPES_WITH_FILTERS_SUCCESS, FETCH_RECIPES_WITH_FILTERS_FAILURE,
    REMOVE_FILTERS, FETCH_DETAIL_ABOUT_RECIPE_REQUEST, FETCH_DETAIL_ABOUT_RECIPE_SUCCESS, FETCH_DETAIL_ABOUT_RECIPE_FAILURE} from "../types/recipeTypes"
import {recipesURL, URL} from "../../config/Constant"

export const fetchRecipesRequest = () => {
    return {
        type: FETCH_RECIPES_REQUEST
    }
}

export const fetchRecipesSuccess = recipes => {
    return {
        type: FETCH_RECIPES_SUCCESS, 
        payload: recipes
    }
}

export const fetchRecipesFailure = error => {
    return {
        type: FETCH_RECIPES_FAILURE, 
        payload: error
    }
}

export const fetchRecipesWithNameRequest = recipeName => {
    return {
        type: FETCH_RECIPES_WITH_NAME_REQUEST,
        recipeName: recipeName
    }
}

export const fetchRecipesWithNameSuccess = recipes => {
    return {
        type: FETCH_RECIPES_WITH_NAME_SUCCESS, 
        payload: recipes
    }
}

export const fetchRecipesWithNameFailure = error => {
    return {
        type: FETCH_RECIPES_WITH_NAME_FAILURE, 
        recipeName: "",
        payload: error
    }
}

export const fetchRecipesWithFiltersSuccess = recipes => {
    return {
        type: FETCH_RECIPES_WITH_FILTERS_SUCCESS, 
        payload: recipes
    }
}

export const fetchRecipesWithFiltersFailure = error => {
    return {
        type: FETCH_RECIPES_WITH_FILTERS_FAILURE, 
        payload: error
    }
}

export const setIncludedIngredients = (payload) => {
    return{
        type: SET_INCLUDED_INGREDIENTS, 
        payload: payload
    }
}

export const setExcludedIngredients = (payload) => {
    return{
        type: SET_EXCLUDED_INGREDIENTS, 
        payload: payload
    }
}

export const setIncludedAuthors = (payload) => {
    return{
        type: SET_INCLUDED_AUTHORS, 
        payload: payload
    }
}

export const setExcludedAuthors = (payload) => {
    return{
        type: SET_EXCLUDED_AUTHORS, 
        payload: payload
    }
}

export const setIncludedCategories = (payload) => {
    return{
        type: SET_INCLUDED_CATEGORIES, 
        payload: payload
    }
}

export const setExcludedCategories = (payload) => {
    return{
        type: SET_EXCLUDED_CATEGORIES, 
        payload: payload
    }
}

export const setIncludedCuisines = (payload) => {
    return{
        type: SET_INCLUDED_CUISINES, 
        payload: payload
    }
}

export const setExcludedCuisines = (payload) => {
    return{
        type: SET_EXCLUDED_CUISINES, 
        payload: payload
    }
}

export const setIncludedKitchenware = (payload) => {
    return{
        type: SET_INCLUDED_KITCHENWARE, 
        payload: payload
    }
}

export const setExcludedKitchenware = (payload) => {
    return{
        type: SET_EXCLUDED_KITCHENWARE, 
        payload: payload
    }
}

export const setIncludedMethods = (payload) => {
    return{
        type: SET_INCLUDED_METHODS, 
        payload: payload
    }
}

export const setExcludedMethods = (payload) => {
    return{
        type: SET_EXCLUDED_METHODS, 
        payload: payload
    }
}

export const setMinTime = (payload) => {
    return{
        type: SET_MIN_TIME, 
        payload: payload
    }
}

export const setMaxTime = (payload) => {
    return{
        type: SET_MAX_TIME, 
        payload: payload
    }
}

export const setMinRating = (payload) => {
    return{
        type: SET_MIN_RATING, 
        payload: payload
    }
}

export const setMaxRating = (payload) => {
    return{
        type: SET_MAX_RATING, 
        payload: payload
    }
}

export const removeFilters = () => {
    return{
        type: REMOVE_FILTERS, 
    }
}

export const fetchDetailAboutRecipeRequest = () => {
    return {
        type: FETCH_DETAIL_ABOUT_RECIPE_REQUEST
    }
}

export const fetchDetailAboutRecipeSuccess = recipe => {
    return {
        type: FETCH_DETAIL_ABOUT_RECIPE_SUCCESS, 
        payload: recipe
    }
}

export const fetchDetailAboutRecipeFailure = error => {
    return {
        type: FETCH_DETAIL_ABOUT_RECIPE_FAILURE, 
        payload: error
    }
}



const arrToStr = (array) => {
    var array1 = []
    array.map((elem) => {array1.push(elem.name)});
    return array1.join()    
}

export const fetchRecipesWithFilters = (minTime, maxTime, minRating, maxRating, inA, exA, inCa, exCa,
                            inCM, exCM, inCu, exCu, inK, exK, inI, exI) => {
    return (dispatch) => {        
        var urlFINAL = `${recipesURL}/filters/inA=${arrToStr(inA)}&exA=${arrToStr(exA)}&inCa=${arrToStr(inCa)}&exCa=${arrToStr(exCa)}&inCM=${arrToStr(inCM)}&exCM=${arrToStr(exCM)}&inCu=${arrToStr(inCu)}&exCu=${arrToStr(exCu)}&inK=${arrToStr(inK)}&exK=${arrToStr(exK)}&inI=${arrToStr(inI)}&exI=${arrToStr(exI)}&minTime=${minTime}&maxTime=${maxTime}&minRating=${minRating}&maxRating=${maxRating}`
        dispatch(fetchRecipesRequest())
        axios
            .get(urlFINAL)
            .then(response => {
                const recipes = response.data
                dispatch(fetchRecipesWithFiltersSuccess(recipes))
            })
            .catch(error => {
                dispatch(fetchRecipesWithFiltersFailure(error.message))
            })
    }
}

export const fetchRecipesWithName = (name) => {
    return (dispatch) => {
        dispatch(fetchRecipesWithNameRequest(name))
        axios
            .get(`${recipesURL}/${name}`)
            .then(response => {
                const recipes = response.data
                dispatch(fetchRecipesWithNameSuccess(recipes))
            })
            .catch(error => {
                dispatch(fetchRecipesWithNameFailure(error.message))
            })
    }
}

export const fetchRecipes = () => {
    return (dispatch) => {
        dispatch(fetchRecipesRequest())
        axios
            .get(`${recipesURL}`)
            .then(response => {
                const recipes = response.data
                dispatch(fetchRecipesSuccess(recipes))
            })
            .catch(error => {
                dispatch(fetchRecipesFailure(error.message))
            })
    }
}

export const fetchDetailAboutRecipe = (uri) => {
    var uriSplit = uri.split("#")

    return (dispatch) => {
        dispatch(fetchDetailAboutRecipeRequest())
        axios
            .get(`${URL}/recipes/detail/${uriSplit[uriSplit.length-1]}`)
            .then(response => {
                const recipe = response.data
                dispatch(fetchDetailAboutRecipeSuccess(recipe))
            })
            .catch(error => {
                dispatch(fetchDetailAboutRecipeFailure(error.message))
            })
    }
}

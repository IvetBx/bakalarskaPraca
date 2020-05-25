import axios from "axios"
import { FETCH_RECIPES_REQUEST, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE,
    FETCH_RECIPES_WITH_NAME_SUCCESS, FETCH_RECIPES_WITH_NAME_FAILURE, FETCH_RECIPES_WITH_NAME_REQUEST, 
    SET_INCLUDED_INGREDIENTS, SET_EXCLUDED_INGREDIENTS, SET_EXCLUDED_AUTHORS, SET_INCLUDED_AUTHORS, 
    SET_EXCLUDED_CATEGORIES, SET_INCLUDED_CATEGORIES, SET_EXCLUDED_CUISINES, SET_INCLUDED_CUISINES,
    SET_EXCLUDED_KITCHENWARE, SET_INCLUDED_KITCHENWARE, SET_EXCLUDED_METHODS, SET_INCLUDED_METHODS,
    SET_MIN_TIME,  SET_MAX_TIME, FETCH_RECIPES_WITH_FILTERS_SUCCESS, FETCH_RECIPES_WITH_FILTERS_FAILURE,
    REMOVE_FILTERS, FETCH_DETAIL_ABOUT_RECIPE_REQUEST, FETCH_DETAIL_ABOUT_RECIPE_SUCCESS, FETCH_DETAIL_ABOUT_RECIPE_FAILURE, 
    CREATE_RECIPE_REQUEST, CREATE_RECIPE_FAILURE, CREATE_RECIPE_SUCCESS, SET_RECIPE_DETAIL, DELETE_RECIPE_FAILURE, DELETE_RECIPE_SUCCESS,
    FETCH_SIMILAR_RECIPES_SUCCESS, FETCH_SIMILAR_RECIPES_FAILURE} from "../types/RecipeTypes"
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

export const setIncludedIngredients = (payload, all) => {
    return{
        type: SET_INCLUDED_INGREDIENTS, 
        payload: payload,
        all: all
    }
}

export const setExcludedIngredients = (payload) => {
    return{
        type: SET_EXCLUDED_INGREDIENTS, 
        payload: payload
    }
}

export const setIncludedAuthors = (payload, all) => {
    return{
        type: SET_INCLUDED_AUTHORS, 
        payload: payload,
        all: all
    }
}

export const setExcludedAuthors = (payload) => {
    return{
        type: SET_EXCLUDED_AUTHORS, 
        payload: payload
    }
}

export const setIncludedCategories = (payload, all) => {
    return{
        type: SET_INCLUDED_CATEGORIES, 
        payload: payload,
        all: all
    }
}

export const setExcludedCategories = (payload) => {
    return{
        type: SET_EXCLUDED_CATEGORIES, 
        payload: payload
    }
}

export const setIncludedCuisines = (payload, all) => {
    return{
        type: SET_INCLUDED_CUISINES, 
        payload: payload,
        all: all
    }
}

export const setExcludedCuisines = (payload) => {
    return{
        type: SET_EXCLUDED_CUISINES, 
        payload: payload
    }
}

export const setIncludedKitchenware = (payload, all) => {
    return{
        type: SET_INCLUDED_KITCHENWARE, 
        payload: payload,
        all: all
    }
}

export const setExcludedKitchenware = (payload) => {
    return{
        type: SET_EXCLUDED_KITCHENWARE, 
        payload: payload
    }
}

export const setIncludedMethods = (payload, all) => {
    return{
        type: SET_INCLUDED_METHODS, 
        payload: payload,
        all: all
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

export const createRecipeRequest = recipe => {
    return {
        type: CREATE_RECIPE_REQUEST,
        payload: recipe
    }
}

export const createRecipeSuccess = recipe => {
    return {
        type: CREATE_RECIPE_SUCCESS, 
        payload: recipe
    }
}

export const createRecipeFailure = error => {
    return {
        type: CREATE_RECIPE_FAILURE, 
        payload: error
    }
}

export const setRecipeDetail = recipe => {
    return {
        type: SET_RECIPE_DETAIL,
        payload: recipe
    }
}

export const deleteRecipeSuccess = () => {
    return {
        type: DELETE_RECIPE_SUCCESS
    }
}

export const deleteRecipeFailure = (error) => {
    return {
        type: DELETE_RECIPE_FAILURE, 
        payload: error
    }
}

export const fetchSimilarRecipesSuccess = recipes => {
    return {
        type: FETCH_SIMILAR_RECIPES_SUCCESS, 
        payload: recipes
    }
}

export const fetchSimilarRecipesFailure = error => {
    return {
        type: FETCH_SIMILAR_RECIPES_FAILURE, 
        payload: error
    }
}



const arrToStr = (array) => {
    var array1 = []
    array.map((elem) => {array1.push(elem.name)});
    return array1.join()    
}

export const fetchRecipesWithFilters = (minTime, maxTime, inA, exA, inCa, exCa,
                            inCM, exCM, inCu, exCu, inK, exK, inI, exI, Aall, CAall, CMall, CUall, Kall, Iall) => {
    return (dispatch) => {        
        var urlFINAL = `${recipesURL}/filters/inA=${arrToStr(inA)}&exA=${arrToStr(exA)}&inCa=${arrToStr(inCa)}&exCa=${arrToStr(exCa)}&inCM=${arrToStr(inCM)}&exCM=${arrToStr(exCM)}&inCu=${arrToStr(inCu)}&exCu=${arrToStr(exCu)}&inK=${arrToStr(inK)}&exK=${arrToStr(exK)}&inI=${arrToStr(inI)}&exI=${arrToStr(exI)}&minTime=${minTime}&maxTime=${maxTime}&Aall=${Aall}&CAall=${CAall}&CMall=${CMall}&CUall=${CUall}&Kall=${Kall}&Iall=${Iall}`
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

export const fetchRecipesFromAuthor = (username) => {
    return (dispatch) => {        
        dispatch(fetchRecipesRequest())
        axios
            .get(`${recipesURL}/user=${username}`)
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
    return (dispatch) => {
        dispatch(fetchDetailAboutRecipeRequest())
        axios
            .get(`${URL}/recipes/detail/${uri}`)
            .then(response => {
                const recipe = response.data
                dispatch(fetchDetailAboutRecipeSuccess(recipe))
            })
            .catch(error => {
                dispatch(fetchDetailAboutRecipeFailure(error.message))
            })
    }
}

export const fetchSimilarRecipes = (uri) => {
return (dispatch) => {
    dispatch(fetchRecipesRequest())
    axios
        .get(`${URL}/recipes/similar/${uri}`)
        .then(response => {
            const recipe = response.data
            dispatch(fetchSimilarRecipesSuccess(recipe))
        })
        .catch(error => {
            dispatch(fetchSimilarRecipesFailure(error.message))
        })
}
}


export const createRecipe = (recipe) => {
    return (dispatch) => {
        dispatch(createRecipeRequest(recipe))
        axios
            .post(`${URL}/recipes`, recipe)
            .then(response => {
                const recipe1 = response.data
                dispatch(createRecipeSuccess(recipe1))
            })
            .catch(error => {
                dispatch(createRecipeFailure(error.response.data.message))
            })
    }
}

export const updateRecipe = (user, uri, recipe) => {
    var uriSplit = uri.split("#")
    var id = uriSplit[uriSplit.length-1]

    return (dispatch) => {
        dispatch(createRecipeRequest(recipe))
        axios
            .put(`${URL}/${user}/recipes/${id}`, recipe)
            .then(response => {
                const recipe1 = response.data
                dispatch(deleteRecipeSuccess())
            })
            .catch(error => {
                dispatch(deleteRecipeFailure(error.response.data.message))
            })
    }
}

export const deleteRecipe = (user, uri) => {
    var uriSplit = uri.split("#")
    var id = uriSplit[uriSplit.length-1]
    var username = JSON.parse(user).username

    return (dispatch) => {
        dispatch(fetchDetailAboutRecipeRequest())
        axios
            .delete(`${URL}/${username}/recipes/${id}`)
            .then(response => {
                dispatch(deleteRecipeSuccess())
            })
            .catch(error => {
                dispatch(deleteRecipeFailure(error))
            })
    }
}

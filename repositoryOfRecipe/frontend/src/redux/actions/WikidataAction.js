import axios from "axios"
import { FETCH_WIKIDATA_LIST_FAILURE, FETCH_WIKIDATA_LIST_SUCCESS, FETCH_WIKIDATA_LIST_REQUEST, FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_FAILURE,
FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_SUCCESS, FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_REQUEST, FETCH_WIKIDATA2_LIST_SUCCESS, FETCH_WIKIDATA3_LIST_SUCCESS } from "../types/WikidataTypes"
import {URL} from "../../config/Constant"

export const fetchWikidataListRequest = () => {
    return {
        type: FETCH_WIKIDATA_LIST_REQUEST
    }
}

export const fetchWikidataListSuccess = listOf => {
    return {
        type: FETCH_WIKIDATA_LIST_SUCCESS, 
        payload: listOf
    }
}

export const fetchWikidata2ListSuccess = listOf => {
    return {
        type: FETCH_WIKIDATA2_LIST_SUCCESS, 
        payload: listOf
    }
}

export const fetchWikidata3ListSuccess = listOf => {
    return {
        type: FETCH_WIKIDATA3_LIST_SUCCESS, 
        payload: listOf
    }
}

export const fetchWikidataListFailure = error => {
    return {
        type: FETCH_WIKIDATA_LIST_FAILURE, 
        payload: error
    }
}

export const fetchMoreInfoAboutWikidataEntityRequest = () => {
    return {
        type: FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_REQUEST
    }
}

export const fetchMoreInfoAboutWikidataEntitySuccess = (info, entityName) => {
    return {
        type: FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_SUCCESS,
        payload: info,
        entityName: entityName
    }
}

export const fetchMoreInfoAboutWikidataEntityFailure = error => {
    return {
        type: FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_FAILURE,
        payload: error
    }    
}

export const fetchWikidataList = (entity) => {
    return (dispatch) => {
        dispatch(fetchWikidataListRequest())
        axios
            .get(`${URL}/listOf/${entity}`)
            .then(response => {
                const first = [{uri:"", label:""}]
                const listOf = first.concat(response.data)
                dispatch(fetchWikidataListSuccess(listOf))
            })
            .catch(error => {
                dispatch(fetchWikidataListFailure(error.message))
            })
    }
}

export const fetchWikidata2List = (entity) => {
    return (dispatch) => {
        dispatch(fetchWikidataListRequest())
        axios
            .get(`${URL}/listOf/${entity}`)
            .then(response => {
                const first = [{uri:"", label:""}]
                console.log(response.data)
                const listOf =  first.concat(response.data)
                dispatch(fetchWikidata2ListSuccess(listOf))
            })
            .catch(error => {
                dispatch(fetchWikidataListFailure(error.message))
            })
    }
}

export const fetchWikidata3List = (entity) => {
    return (dispatch) => {
        dispatch(fetchWikidataListRequest())
        axios
            .get(`${URL}/listOf/${entity}`)
            .then(response => {
                const first = [{uri:"", label:""}]
                const listOf =  first.concat(response.data)
                dispatch(fetchWikidata3ListSuccess(listOf))
            })
            .catch(error => {
                dispatch(fetchWikidataListFailure(error.message))
            })
    }
}

export const fetchMoreInfoAboutWikidataEntity = (uri, entityName) => {
    var uriSplit = uri.split("/")

    return (dispatch) => {
        dispatch(fetchMoreInfoAboutWikidataEntityRequest())
        axios
            .get(`${URL}/listOf/moreInfo/${uriSplit[uriSplit.length-1]}`)
            .then(response => {
                const info = response.data
                dispatch(fetchMoreInfoAboutWikidataEntitySuccess(info, entityName))
            })
            .catch(error => {
                dispatch(fetchMoreInfoAboutWikidataEntityFailure(error.message))
            })
    }
}
import { FETCH_WIKIDATA_LIST_FAILURE, FETCH_WIKIDATA_LIST_SUCCESS, FETCH_WIKIDATA_LIST_REQUEST,
FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_FAILURE, FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_REQUEST, FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_SUCCESS } from "../types/wikidataTypes"

const initState={
    loading: false,
    wikidataList: [],
    moreInfoAboutEntity: null,
    entityName: "",
    error: "",
}

const wikidataReducer=(state=initState, action) => {
    switch(action.type){
        case FETCH_WIKIDATA_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_WIKIDATA_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wikidataList: action.payload,
                moreInfoAboutEntity: null,
                entityName:"",
                error: ""
            }

        case FETCH_WIKIDATA_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                wikidataList: [],
                moreInfoAboutEntity: null,
                entityName:"",
                error: action.payload
            }

        case FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_SUCCESS:
            return {
                ...state,
                loading: false,
                wikidataList:[],
                moreInfoAboutEntity:action.payload,
                entityName:action.entityName,
                error: ""
            }

        case FETCH_MORE_INFO_ABOUT_WIKIDATA_ENTITY_FAILURE:
            return {
                ...state,
                loading: false,
                wikidataList:[],
                moreInfoAboutEntity:null,
                entityName:"",
                error: action.payload
            }

        default:
            return state
    }
}

export default wikidataReducer
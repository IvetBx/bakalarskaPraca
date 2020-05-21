import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, LOG_OUT } from "../types/UserTypes"

const initState={
    loading:false,
    error:"",
    user:"",
}


const userReducer=(state=initState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading:true
            }

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                user:action.payload,
                error:""
            }

        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading:false,
                username:"",
                error:action.payload
            }

        case LOG_OUT:
            return {
                ...state,
                username:"",
            }

        default:
            return state
    }
}

export default userReducer
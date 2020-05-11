import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, LOG_OUT } from "../types/userTypes"

const initState={
    loading:false,
    error:"",
    username:"",
    password:""
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
                username:action.username,
                password:action.username,
                error:""
            }

        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading:false,
                username:"",
                password:"",
                error:action.payload
            }

        case LOG_OUT:
            return {
                ...state,
                username:"",
                password:""
            }

        default:
            return state
    }
}

export default userReducer
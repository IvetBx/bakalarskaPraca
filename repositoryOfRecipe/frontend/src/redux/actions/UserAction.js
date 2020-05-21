import axios from "axios"
import { FETCH_USER_FAILURE, FETCH_USER_SUCCESS, FETCH_USER_REQUEST, LOG_OUT } from "../types/UserTypes"
import {URL} from "../../config/Constant"

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

export const fetchUserSuccess = user => {
    return {
        type: FETCH_USER_SUCCESS, 
        payload: user,
    }
}

export const fetchUserFailure = error => {
    return {
        type: FETCH_USER_FAILURE, 
        payload: error
    }
}

export const logOut = () => {
    const userInfo = {"username":"", "password":"", "uri":""}
    localStorage.setItem("user", JSON.stringify(userInfo))
    return{
        type: LOG_OUT
    }
}

export const fetchUser = (username, password) => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios
            .get(`${URL}/user/username=${username}password=${password}`)
            .then(response => {
                const userInfo = response.data
                
                localStorage.setItem("user", JSON.stringify(userInfo))
                dispatch(fetchUserSuccess(userInfo))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.response.data.message))
            })
    }
}

export const addUser = (user) => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios
            .post(`${URL}/users`, user)
            .then(response => {
                localStorage.setItem("user", JSON.stringify(user))
                dispatch(fetchUserSuccess(user))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.response.data.message))
            })
    }
}
import axios from "axios"
import { FETCH_USER_FAILURE, FETCH_USER_SUCCESS, FETCH_USER_REQUEST, LOG_OUT } from "../types/userTypes"
import {URL} from "../../config/Constant"

export const localStorageLoadUser = () => {
    try {
        const user = localStorage.getItem("user")
        if(user === null){
            return undefined
        }
        return JSON.parse(user)
    } catch (err){
        return undefined
    }
}
/*
export const saveState = (user) => {
    try {
        const userJson = JSON.stringify(user)
        localStorage.setItem("user", userJson)
    } 
}*/

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

export const fetchUserSuccess = user => {
    return {
        type: FETCH_USER_SUCCESS, 
        username: user.username,
        password: user.password
    }
}

export const fetchUserFailure = error => {
    return {
        type: FETCH_USER_FAILURE, 
        payload: error
    }
}

export const logOut = () => {
    return{
        type: LOG_OUT
    }
}

export const fetchUser = (username, password) => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios
            .get(`${URL}/user/userName=${username}password=${password}`)
            .then(response => {
                const userInfo = response.data
                localStorage.setItem("user", JSON.stringify(userInfo))
                if(userInfo.username && userInfo.password){
                    dispatch(fetchUserSuccess(userInfo))
                } else {
                    dispatch(fetchUserFailure("Wrong username or password."))
                }
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            })
    }
}
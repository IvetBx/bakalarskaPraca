import React from "react"
import {Spinner } from "react-bootstrap"

export const loading = (conditions) => {
    if(conditions){
        return <div className="d-flex justify-content-center"><Spinner animation="border" variant="dark"/></div> 
    }
}

export const displayError = (conditions, error) => {
    if(conditions){
        return <div className="d-flex justify-content-center"><h2>{error}</h2></div> 
    }
}

export const cantDisplay = (first, second) => {
    return(
        <div>
            <h2 className="d-flex justify-content-center font-weight-bolder mt-5 mb-2 text-danger">{first}</h2>
            <h1 className="d-flex justify-content-center font-weight-bolder mb-2 text-info">{second}</h1>
        </div>
    )
}
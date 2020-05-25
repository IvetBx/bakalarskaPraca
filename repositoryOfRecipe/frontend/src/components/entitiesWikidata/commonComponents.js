import React from "react"
import {Spinner, Nav} from "react-bootstrap"

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

export const fieldTdTable = (uri, label) => {
    return(
        <td>
            <Nav.Item>
                <Nav.Link href={uri}>{label}</Nav.Link>
            </Nav.Item>
        </td>
    )
}

export const fieldThTable = (headInfo) => {
    return(
        <thead><tr>
            {headInfo.map((text, index) =>  
                <th key={index} className="pt-3 pb-3">{text}</th>)}
        </tr></thead>
    )
}
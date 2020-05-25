import React from "react"
import { FormControl, FormLabel, Form, Nav } from "react-bootstrap"
import { Field } from "formik"
import {dbUsers} from "../../config/Constant"

export const formField = (label, type, placeholder, name, invalid, error, href, margin) => {
    return(
        <Form.Group>
            <FormLabel><Nav.Link href={href} className={`text-info font-weight-bold p-0 ${margin}`}>{label}</Nav.Link></FormLabel>
            <Field placeholder={placeholder} name={name} type={type} as={FormControl} isInvalid={invalid} />
            <Form.Control.Feedback type="invalid"> {error} </Form.Control.Feedback>
        </Form.Group>
    )
}

export const initVal = {
    uri:dbUsers,
    username:"",
    password:""
}
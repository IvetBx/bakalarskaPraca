import React, { Component } from 'react';
import Filters from "./Filters";

export default class ListRecipes extends Component{

    constructor(props){
        super(props);
        this.state = {deps:[], addModalShow : false}
    }

    render(){

        return(
            <div>
                <Filters />


            </div>

        )
    }
}


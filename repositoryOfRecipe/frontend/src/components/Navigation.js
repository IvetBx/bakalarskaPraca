import React, { useState } from 'react';
import {Navbar, Button,Nav,FormControl,Form, NavDropdown} from "react-bootstrap";
import { connect } from 'react-redux'
import { fetchRecipesWithName, logOut } from "../redux/Index"


function Navigation (props) {

    const [recipeName, setRecipeName] = useState("")
    const localStorageUser = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="navigation" >
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Repository of recipes</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">
                     <Nav.Link href="/recipes">All recipes</Nav.Link>

                     <NavDropdown title="List of" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/listOf/cookingMethod">Cooking methods</NavDropdown.Item>
                        <NavDropdown.Item href="/listOf/cuisine">Cuisines</NavDropdown.Item>
                        <NavDropdown.Item href="/listOf/kitchenware">Kitchenware</NavDropdown.Item>
                        <NavDropdown.Item href="/listOf/food">Food</NavDropdown.Item>
                     </NavDropdown>

                     <NavDropdown title="My account" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/createRecipe/-1">Create recipe</NavDropdown.Item>
                        <NavDropdown.Item href="/myRecipes">My recipes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        {localStorageUser.username ? <NavDropdown.Item href={`/user/${localStorageUser.username}`} disabled>{localStorageUser.username}</NavDropdown.Item> 
                                             : <NavDropdown.Item href={`/user/${localStorageUser.username}`} disabled>Anonymous user</NavDropdown.Item>} 
                    </NavDropdown>
                </Nav>
                <Nav>
                        {!localStorageUser.username ? <Nav.Link href="/logIn" className="mr-sm-3">Log in</Nav.Link> 
                                         : <Nav.Link href="/logIn" onClick={() => props.logOut()} className="mr-sm-3">Log out</Nav.Link> }
                    
                    <Form inline>
                        <FormControl type="text" value={recipeName} onChange={e => setRecipeName(e.target.value)} placeholder="Search recipe" className="mr-sm-3" />
                        <Button variant="outline-light" onClick={() => props.fetchRecipesWithName(recipeName)}>Search</Button>
                    </Form>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        fetchRecipesWithName: (recipeName) => dispatch(fetchRecipesWithName(recipeName)),
        logOut: () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)




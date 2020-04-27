import React from 'react';
import {Navbar, Button,Nav,FormControl,Form, NavDropdown} from "react-bootstrap";

const Navigation = props => {

    return (
        <div className="navigation" >
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Repository of recipes</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">
                     <Nav.Link href="/recipes">All recipes</Nav.Link>

                     <NavDropdown title="List of" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/listOf/cookingMethods">Cooking methods</NavDropdown.Item>
                        <NavDropdown.Item href="/listOf/cuisines">Cuisines</NavDropdown.Item>
                        <NavDropdown.Item href="/listOf/kitchenware">Kitchenware</NavDropdown.Item>
                        <NavDropdown.Item href="/listOf/ingredients">Ingredients</NavDropdown.Item>
                     </NavDropdown>

                     <NavDropdown title="My account" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/createRecipe">Create recipe</NavDropdown.Item>
                        <NavDropdown.Item href="/myRecipes">My recipes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/users/x">Anonymous user</NavDropdown.Item>
                     </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#logIn" className="mr-sm-3" >Log in</Nav.Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-3" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>

    )
}

export default (Navigation)




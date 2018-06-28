import React from 'react'

import { Nav, Navbar, NavItem, NavLink } from 'reactstrap'

const footer = () => (
    <Navbar color="dark" dark expand="md">
        <Nav className="mx-auto" navbar>
            <NavItem>
                <NavLink href="https://github.com/d1a9x8u9/twitterClone"><i className="fab fa-github fa-2x"></i></NavLink>
            </NavItem>
        </Nav>
    </Navbar>
)

export default footer
import React, { Component } from 'react'

import './Footer.css'
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap'

class Footer extends Component {
    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <Nav className="mx-auto" navbar>
                    <NavItem>
                        <NavLink href="https://github.com/d1a9x8u9/twitterClone"><i className="fab fa-github fa-2x"></i></NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Footer
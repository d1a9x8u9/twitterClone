import React from 'react'

import { Container, Row } from 'reactstrap'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Footer from '../Navigation/Footer/Footer'
import './Layout.css'

const layout = (props) => (
    <div className="layout">
        <Toolbar />
        <Container className="container">
            <Row className="justify-content-md-center">
                {props.children}            
            </Row>
        </Container>
        <Footer />
    </div>
)

export default layout
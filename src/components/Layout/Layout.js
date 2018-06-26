import React from 'react'

import { Container, Row } from 'reactstrap'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Footer from '../Navigation/Footer/Footer'
import './Layout.css'
import { Progress } from 'reactstrap'
import { connect } from 'react-redux'

const layout = (props) => (
            <div className="layout">
                <div className="Progress">
                    <Progress color="danger" value={props.progress} />
                </div>
                <Toolbar />
                <Container className="container">
                    <Row className="justify-content-md-center">
                        {props.children}            
                    </Row>
                </Container>
                <Footer />
            </div>
        )

const mapToStateProps = state => {
    return {
        user: state.userPreCombine.user,
        posts: state.post.posts,
        progress: state.post.progress
    }
}

export default connect(mapToStateProps)(layout)
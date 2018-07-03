import React from 'react'

import { Container, Row } from 'reactstrap'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import { connect } from 'react-redux'
import Loading from '../Navigation/Loading/Loading'

const layout = (props) => (
            <div className="w-100 h-100">
                <Toolbar />
                <Container className="container">
                    <Row className="justify-content-md-center">
                        {props.progress === 100 ? props.children : <Loading />}            
                    </Row>
                </Container>
            </div>
        )

const mapToStateProps = state => {
    return {
        progress: state.post.progress
    }
}

export default connect(mapToStateProps)(layout)
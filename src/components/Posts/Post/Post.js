import React, { Component } from 'react'

import { Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap'
import { connect } from 'react-redux'
import { deletePostFromDb } from '../../../store/actions/actions'
import './Post.css'

class Post extends Component {
    render() {
        let deleteView = null

        if(this.props.user && this.props.user.email === this.props.post.author)  
            deleteView = (
                <i className="fas fa-times" onClick={() => this.props.deletePostFromDb(this.props.post.postId)}></i>
            )
            
        return (
            <Card className="my-2 Card">
                <div className="d-flex flex-row justify-content-between pt-1 px-1 pl-2">
                <CardText className="CardText">{this.props.post.message}</CardText>
                {deleteView}
                </div>
                {this.props.post.imgDownloadURL ? <CardImg top width="100%" src={this.props.post.imgDownloadURL} alt='img.jpg' /> : null}
                <div className="px-2 text-right">
                    <i className="far fa-thumbs-up"></i>
                    <i className="far fa-heart pl-2"></i>
                </div>
                <CardBody className="pt-2 pb-1 px-1 text-right">
                    <CardSubtitle className="CardSubtitle">{this.props.post.date}&nbsp;{this.props.post.time}</CardSubtitle>
                    <CardTitle className="mb-1 CardTitle">{this.props.post.author}</CardTitle>
                </CardBody>
            </Card>
        )
    }
}

const mapToStateProps = state => {
    return {
        user: state.userPreCombine.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletePostFromDb: (postId) => dispatch(deletePostFromDb(postId))
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(Post)
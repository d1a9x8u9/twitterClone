import React, { Component } from 'react'

import { Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { deletePostFromDb } from '../../../store/actions/actions'
import './Post.css'

class Post extends Component {
    state = {
        modal: false
    }

    toggleDeleteConfirmation = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    confirmDelete = (postId, imgUrl) => {
        this.toggleDeleteConfirmation()
        this.props.deletePostFromDb(postId, imgUrl)
    }

    render() {
        let deleteView = null

        if (this.props.user && this.props.user.email === this.props.post.author)
            deleteView = (
                <i className="fas fa-times" onClick={this.toggleDeleteConfirmation}></i>
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
                    <i className="far fa-heart pl-3"></i>
                </div>
                <CardBody className="pt-2 pb-1 px-1 text-right">
                    <CardSubtitle className="CardSubtitle">{this.props.post.date}&nbsp;{this.props.post.time}</CardSubtitle>
                    <CardTitle className="mb-1 CardTitle">{this.props.post.author}</CardTitle>
                </CardBody>
                <Modal isOpen={this.state.modal} toggle={this.toggleDeleteConfirmation} className={this.props.className}>
                    <ModalHeader toggle={this.toggleDeleteConfirmation}>Delete confirmation</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this post?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => this.confirmDelete(this.props.post.postId, this.props.post.imgDownloadURL)}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDeleteConfirmation}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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
        deletePostFromDb: (postId, imgURL) => dispatch(deletePostFromDb(postId, imgURL))
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(Post)
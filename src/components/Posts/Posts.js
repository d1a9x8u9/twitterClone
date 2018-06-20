import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { auth } from '../../firebase'
import './Posts.css'
import { submit_post, loadPostsFromDb } from '../../store/actions/actions'
import { Button, Form, FormGroup, Label, Input, TextArea } from 'reactstrap'

class Posts extends Component {
    state = {
        user: null,
        message: '',
        errorMessage: null
    }

    componentWillMount = () => {
        auth.onAuthStateChanged( user => {
            if(user)
                this.setState({user: user})
            this.props.onLoadDataFromDb()
        })
    }

    onChangeHandler = (e) => {
        this.setState({
            message: e.target.value
        })
    }
    
    onSubmitMessageClickHandler = (e) => {
        if(!this.state.message.trim()) {
            this.setState({errorMessage: `Message is empty.`})
            return
        }
        this.props.onSubmitMessage(this.state.message, this.state.user.email)
        this.setState({
            errorMessage: null
        })
        e.preventDefault()
    }

    render() {
        let createPostView = null
        if(this.state.user) 
            createPostView = (
                <Form>
                    <FormGroup className="Message">
                        <Label for="message">Tell us whats on your mind</Label>
                        <Input type="textarea" name="message" onChange={this.onChangeHandler} />
                    </FormGroup>
                    <Button onClick={this.onSubmitMessageClickHandler}>Submit</Button> &nbsp;
                    {this.state.errorMessage ? <Label className="text-danger posts-err-msg">{this.state.errorMessage}</Label> : null}
                </Form>
            )
            
        return(
            <div className="Posts">
                {createPostView}
                {this.props.posts.map( post => {
                    return <div key={post.postId}> {post.time}&nbsp;{post.author}<br/>{post.message}</div>
                })}
            </div>
        )
    }
}

const mapToStateProps = state => {
    return {
        user: state.userPreCombine.user,
        posts: state.post.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitMessage: (message, email) => dispatch(submit_post(message, email)),
        onLoadDataFromDb: () => dispatch(loadPostsFromDb())
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(Posts)
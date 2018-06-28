import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../../firebase'
import './Posts.css'
import { submit_post } from '../../store/actions/actions'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Post from './Post/Post'

class Posts extends Component {
    state = {
        user: null,
        message: '',
        image: null,
        errorMessage: null,
        unsubscribe: null
    }

    componentDidMount = () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            this.setState({
                user: user,
                unsubscribe: unsubscribe
            })
        })
    }

    componentWillUnmount = () => {
        this.state.unsubscribe()
    }

    onChangeHandler = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    onImgChangeHandler = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    
    onSubmitMessageClickHandler = (e) => {
        e.preventDefault()

        if(!this.state.message.trim()) {
            this.setState({errorMessage: `Message is empty.`})
            return
        }

        if(this.state.message.trim().length > 140) {
            this.setState({errorMessage: `Post is too long!`})
            return
        }

        if(this.state.image && this.state.image.size > 5000000) {
            this.setState({errorMessage: `The image resolution is too high!`})
            return
        }

        this.props.onSubmitMessage(this.state.message, this.state.user.email, this.state.image)
        this.setState({
            errorMessage: null,
            image: null,
            message: ''
        })
        this.inputImg.value=''
    }

    render() {
        let createPostView = null
        if(this.state.user) 
            createPostView = (
                <Form className="px-3 mb-2 w-95">
                    <FormGroup className="Message">
                        <Label for="message">Tell us whats on your mind</Label>
                        <Input type="textarea" name="message" onChange={this.onChangeHandler} value={this.state.message} /> 
                        <div className="MessageLength">{this.state.message.length}/140</div>
                    </FormGroup>
                    <Button onClick={this.onSubmitMessageClickHandler}>Submit</Button> &nbsp;
                    <Label className="my-1"><input ref={el => this.inputImg = el} type="file" name="image" onChange={this.onImgChangeHandler} /></Label>
                    {this.state.errorMessage ? <Label className="text-danger posts-err-msg">{this.state.errorMessage}</Label> : null}
                    <hr />
                </Form>
            )
        
        let postsView = this.props.posts.map( (post, index) => {
            return <Post key={index} post={post}/>
        })
            
        return(
            <div className="Posts">
                {createPostView}
                <div className="text-center posts-title">Things happening in the world</div>
                <hr />
                <div className="w-95 px-1">
                    {postsView}
                </div>
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
        onSubmitMessage: (message, email, img) => {
            dispatch(submit_post(message, email, img)
        )}
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(Posts)
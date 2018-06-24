import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../../firebase'
import './Posts.css'
import { submit_post, loadPostsFromDb } from '../../store/actions/actions'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Post from './Post/Post'

class Posts extends Component {
    state = {
        user: null,
        message: '',
        image: null,
        errorMessage: null
    }

    componentWillMount = () => {
        auth.onAuthStateChanged( user => {
            this.setState({user: user})
            this.props.onLoadDataFromDb()
        })
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

        if(this.state.image.size > 5000000) {
            this.setState({errorMessage: `The image resolution is too high!`})
            return
        }

        this.props.onSubmitMessage(this.state.message, this.state.user.email, this.state.image)
        this.setState({
            errorMessage: null,
            image: null,
            message: ''
        })
    }

    render() {
        let createPostView = null
        if(this.state.user) 
            createPostView = (
                <Form className="px-3 pb-3 w-100">
                    <FormGroup className="Message">
                        <Label for="message">Tell us whats on your mind</Label>
                        <Input type="textarea" name="message" onChange={this.onChangeHandler} value={this.state.message} />
                    </FormGroup>
                    <Button onClick={this.onSubmitMessageClickHandler}>Submit</Button> &nbsp;
                    <Label className="my-1"><input type="file" name="image" onChange={this.onImgChangeHandler} /></Label>
                    {this.state.errorMessage ? <Label className="text-danger posts-err-msg">{this.state.errorMessage}</Label> : null}
                </Form>
            )
        
        let postsView = this.props.posts.map( (post, index) => {
            return <Post key={index} post={post}/>
        })
            
        return(
            <div className="Posts">
                {createPostView}
                <div className="w-100 px-1">
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
        )},
        onLoadDataFromDb: () => dispatch(loadPostsFromDb())
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(Posts)
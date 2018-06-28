import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../../Posts/Post/Post'
import './Profile.css'

class Profile extends Component {
    componentWillMount  = () => {
        if(!this.props.user && !this.props.posts)
            this.props.history.push('/')
    }

    render() {
        let postsView = null

        if(this.props.user && this.props.posts) {
            let filterAllPostsOnAuthor = this.props.posts.filter( post => post.author === this.props.user.email)
            postsView = filterAllPostsOnAuthor.map( (post, index) => <Post key={index} post={post}/> )
        } 
        else 
            postsView = this.props.posts.map( (post, index) => <Post key={index} post={post}/> )

        return(
            <div className="Profile">
                <div className="h2 text-center profile-title">My Posts</div>
                <hr />
                <div className="px-1">
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

export default connect(mapToStateProps)(Profile)
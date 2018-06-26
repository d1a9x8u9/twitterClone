import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../../Posts/Post/Post'
import './Profile.css'

class Profile extends Component {
    componentWillMount  = () => {
        if(!this.props.user)
            this.props.history.push('/')
    }

    render() {
        let postsView = null

        if(this.props.user && this.props.posts) {
            let filterAllPostsOnAuthor = this.props.posts.filter( post => post.author === this.props.user.email)
            postsView = filterAllPostsOnAuthor.map( (post, index) => <Post key={index} post={post}/> )
        }

        return(
            <div className="mx-1 Profile">
                {postsView}
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
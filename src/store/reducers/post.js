import * as actionTypes from '../actions/actions'

const initalState = {
    posts: [],
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.SUBMIT_POST:
            const posts = [...state.posts]
            posts.unshift({
                author: action.post.author, 
                message: action.post.message, 
                date: action.post.date,  
                time: action.post.time,
                postId: action.post.postId
            })
            return {
                ...state,
                posts: posts
            }
        case actionTypes.LOAD_POSTS_FROM_DB:
            return {
                ...state,
                posts: action.posts
            }
    }
    return state
}

export default reducer
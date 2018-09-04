import * as actionTypes from '../actions/actions'

const initalState = {
    posts: [],
    progress: 0
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
                postId: action.post.postId,
                imgDownloadURL: action.post.imgDownloadURL,
                type: action.post.type
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
        case actionTypes.DELETE_POST:
            const postsCopy = [...state.posts]
            const indexOfPost = state.posts.findIndex( post => post.postId === action.postId)
            postsCopy.splice(indexOfPost, 1)
            
            return {
                ...state,
                posts: postsCopy
            }
        case actionTypes.UPDATE_PROGRESS_BAR:
            return {
                ...state,
                progress: action.val
            }

        default:
            return state
    }
}

export default reducer
import firebase from '../../firebase'

const db = firebase.database()

export const STORE_USER = 'STORE_USER'
export const DELETE_USER = 'DELETE_USER'
export const SUBMIT_POST = 'SUBMIT_POST'
export const LOAD_POSTS_FROM_DB = 'LOAD_POSTS_FROM_DB'

export const store_user = (user) => {
    return {
        type: STORE_USER,
        user: user
    }
}

export const delete_user = () => {
    return {
        type: DELETE_USER,
    }
}

export const savePostsFromDb = (posts) => {
    return {
        type: LOAD_POSTS_FROM_DB,
        posts: posts
    }
}

export const loadPostsFromDb = () => {
    return dispatch => {
        let posts = []
        db.ref(`posts/`).once('value')
        .then( snapshot => {
            const dbPosts = snapshot.val()
            if(!dbPosts)
                return
            for (const [key, value] of Object.entries(dbPosts)) {
                let post = { id: key }                   
                for (const [k, v] of Object.entries(value)) post[k] = v                    
                posts.push(post)
            }
            posts.reverse()
            dispatch(savePostsFromDb(posts))
        })
    }
}

export const savePost = (date, time, message, email, postId) => {
    return {
        type: SUBMIT_POST,
        post: {
            message: message,
            author: email,
            date: date,
            time: time,
            postId: postId  
        }
    }
}

export const submit_post = (message, email) => {
   return dispatch => {
        const newPostKey = db.ref().child('posts').push().key
        const today = new Date();
        const date = today.toDateString()
        const postTime = today.toLocaleTimeString('en-US')
        db.ref('/posts/' + newPostKey).set({
            author: email,
            message: message,
            date: date,
            time: postTime
        })
            .then( () => {
                dispatch(savePost( date, postTime, message, email, newPostKey))
            })
            .catch( (err) => {
                console.log("[actions.js] submit_post error!", err)
            })
   }
}
import {
    storage,
    db
} from '../../firebase'

export const STORE_USER = 'STORE_USER'
export const DELETE_USER = 'DELETE_USER'
export const SUBMIT_POST = 'SUBMIT_POST'
export const LOAD_POSTS_FROM_DB = 'LOAD_POSTS_FROM_DB'
export const DELETE_POST = 'DELETE_POST'

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

export const delete_post = (postId) => {
    return {
        type: DELETE_POST,
        postId: postId
    }
}

export const savePostsFromDb = (posts) => {
    return {
        type: LOAD_POSTS_FROM_DB,
        posts: posts
    }
}

export const deletePostFromDb = (postId) => {
    return async dispatch => {
        try {
            await db.ref(`/posts/${postId}`).remove()
            await storage.ref().child(`images/${postId}.jpg`).delete()

            return dispatch(delete_post(postId))
        } catch (err) {
            return console.log(err)
        }
    }
}

export const loadPostsFromDb = () => {
    return async dispatch => {
        
        const downloadCurrentPostsFromFirestore = async () => {
            const firebasePostsBlob = await db.ref(`posts/`).once('value')
            const currentlyStoredPosts = firebasePostsBlob.val()
            let posts = []

            if (!currentlyStoredPosts)
                return

            for (const [key, value] of Object.entries(currentlyStoredPosts)) {
                let post = {}
                for (const [k, v] of Object.entries(value)) post[k] = v
                posts.push(post)
            }
            
            return posts.reverse()
        }

        try {
            const currentPosts = await downloadCurrentPostsFromFirestore()
            
            return dispatch(savePostsFromDb(currentPosts))
        } catch (err) {
            return console.log(err)
        }
    }
}

export const savePost = (date, time, message, email, postId, imgDownloadURL = null) => {
    return {
        type: SUBMIT_POST,
        post: {
            message: message,
            author: email,
            date: date,
            time: time,
            postId: postId,
            imgDownloadURL: imgDownloadURL
        }
    }
}

export const submit_post = (message, email, img) => {
    return async dispatch => {

        const uploadImgToFirestoreAndRetreiveDownloadURL = async (img, postId, date, postTime) => {
            if (!img)
                return null

            const uploadTask = await storage.ref().child(`images/${postId}.jpg`).put(img)

            return uploadTask.ref.getDownloadURL()
        }

        const uploadPostToFirestore = (postId, email, message, date, postTime, imgDownloadURL) => {
            return db.ref(`/posts/${postId}`).set({
                author: email,
                message: message,
                date: date,
                time: postTime,
                postId: postId,
                imgDownloadURL: imgDownloadURL
            })
        }

        try {
            const
                newPostKey = db.ref().child('posts').push().key,
                today = new Date(),
                date = today.toDateString(),
                postTime = today.toLocaleTimeString('en-US'),
                imgDownloadURL = await uploadImgToFirestoreAndRetreiveDownloadURL(img, newPostKey, date, postTime)

            uploadPostToFirestore(newPostKey, email, message, date, postTime, imgDownloadURL)

            return dispatch(savePost(date, postTime, message, email, newPostKey, imgDownloadURL))
        } catch (err) {
            return console.log(err)
        }
    }
}
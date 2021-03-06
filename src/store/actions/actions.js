import {
    storage,
    db
} from '../../firebase'

export const STORE_USER = 'STORE_USER'
export const DELETE_USER = 'DELETE_USER'
export const SUBMIT_POST = 'SUBMIT_POST'
export const LOAD_POSTS_FROM_DB = 'LOAD_POSTS_FROM_DB'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_PROGRESS_BAR = 'UPDATE_PROGRESS_BAR'

export const update_progress_bar = (val) => {
    return {
        type: UPDATE_PROGRESS_BAR,
        val: val
    }
}

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

export const deletePostFromDb = (postId, imgURL) => {
    return async dispatch => {
        try {
            dispatch(update_progress_bar(0))

            await db.ref(`/posts/${postId}`).remove()

            if(imgURL)
                await storage.ref().child(`images/${postId}.jpg`).delete()

            dispatch(update_progress_bar(100))
            
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
            
            /*
            * Query to get the 4 latests posts from db
            const firebasePostsPage = await db.ref(`posts/`).orderByChild("date").limitToLast(4).once('value')
            */
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
            dispatch(update_progress_bar(0))
            const currentPosts = await downloadCurrentPostsFromFirestore()
            dispatch(update_progress_bar(100))
            if(!currentPosts)
                return
            
            return dispatch(savePostsFromDb(currentPosts))
        } catch (err) {
            return console.log(err)
        }
    }
}

export const savePost = (date, time, message, email, postId, imgDownloadURL = null, type) => {
    return {
        type: SUBMIT_POST,
        post: {
            message: message,
            author: email,
            date: date,
            time: time,
            postId: postId,
            imgDownloadURL: imgDownloadURL, 
            type: type
        }
    }
}

export const submit_post = (message, email, img) => {
    return async dispatch => {

        const uploadMediaToFirestoreAndRetreiveDownloadURL = async (type, img, postId, date, postTime) => {
            if (!img)
                return null
            const uploadTask = await storage.ref().child(`images/${postId}.jpg`).put(img) 

            return uploadTask.ref.getDownloadURL()
        }

        const uploadPostToFirestore = (postId, email, message, date, postTime, imgDownloadURL, mediaType) => {
            return db.ref(`/posts/${postId}`).set({
                author: email,
                message: message,
                date: date,
                time: postTime,
                postId: postId,
                imgDownloadURL: imgDownloadURL,
                type: mediaType
            })
        }

        const getMediaType = img => {
            const type = img.type.split("/");
            return type[type.length - 1]
        }

        try {
            dispatch(update_progress_bar(0))
            console.log(img.type);
            const
                newPostKey = db.ref().child('posts').push().key,
                today = new Date(),
                date = today.toDateString(),
                postTime = today.toLocaleTimeString('en-US'),
                type = getMediaType(img),
                imgDownloadURL = await uploadMediaToFirestoreAndRetreiveDownloadURL(type, img, newPostKey, date, postTime)
                
            uploadPostToFirestore(newPostKey, email, message, date, postTime, imgDownloadURL, type)
            
            dispatch(update_progress_bar(100))

            return dispatch(savePost(date, postTime, message, email, newPostKey, imgDownloadURL, type))
        } catch (err) {
            return console.log(err)
        }
    }
}
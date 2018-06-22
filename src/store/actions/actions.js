import firebase, {
    storage
} from '../../firebase'

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
            .then(snapshot => {
                const dbPosts = snapshot.val()
                if (!dbPosts)
                    return
                for (const [key, value] of Object.entries(dbPosts)) {
                    let post = {
                        id: key
                    }

                    for (const [k, v] of Object.entries(value)) post[k] = v
                    posts.push(post)
                }
                posts.reverse()
                dispatch(savePostsFromDb(posts))
            })
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
    return dispatch => {
        const
            newPostKey = db.ref().child('posts').push().key,
            today = new Date(),
            date = today.toDateString(),
            postTime = today.toLocaleTimeString('en-US'),
            storageRef = storage.ref(),
            postImgRef = storageRef.child(`images/${newPostKey}.jpg`)

        if (img) {
            const uploadTask = postImgRef.put(img)
            uploadTask.on('state_changed', snapshot => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused')
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running')
                        break;
                }
            }, err => {
                console.log('[Actions.js] err uploading img!', err)
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(imgDownloadURL => {
                        db.ref('/posts/' + newPostKey).set({
                                author: email,
                                message: message,
                                date: date,
                                time: postTime,
                                imgDownloadURL: imgDownloadURL
                            })
                            .then(() => {
                                dispatch(savePost(date, postTime, message, email, newPostKey, imgDownloadURL))
                            })
                            .catch((err) => {
                                console.log("[actions.js] submit_post error!", err)
                            })
                    });
            });
        } else {
            db.ref('/posts/' + newPostKey).set({
                    author: email,
                    message: message,
                    date: date,
                    time: postTime
                })
                .then(() => {
                    dispatch(savePost(date, postTime, message, email, newPostKey))
                })
                .catch((err) => {
                    console.log("[actions.js] submit_post error!", err)
                })
        }
    }
}
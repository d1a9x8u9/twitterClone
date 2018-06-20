import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "chirper-a4c7e.firebaseapp.com",
    databaseURL: "https://chirper-a4c7e.firebaseio.com",
    projectId: "chirper-a4c7e",
    storageBucket: "chirper-a4c7e.appspot.com",
    messagingSenderId: "83718229828"
  };

firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase;
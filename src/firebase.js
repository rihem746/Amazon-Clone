import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//this is the most recent import version -- firebase update 
const firebaseConfig = {
  apiKey: "AIzaSyDu5BsLZi5cveul3Z3qFPaOyqUxCjFrobc",
  authDomain: "challenge-bdc8f.firebaseapp.com",
  projectId: "challenge-bdc8f",
  storageBucket: "challenge-bdc8f.appspot.com",
  messagingSenderId: "1053325341570",
  appId: "1:1053325341570:web:e96341e271f638b231959b",
  measurementId: "G-BVR9G799WM"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
export {db,auth}

import firebase from 'firebase';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC3U0az91cPMQ54KP4pB8uJtnq1a6a44AE",
    authDomain: "online-store-890db.firebaseapp.com",
    databaseURL: "https://online-store-890db.firebaseio.com",
    projectId: "online-store-890db",
    storageBucket: "online-store-890db.appspot.com",
    messagingSenderId: "8779185837"
};

const fire = firebase.initializeApp(config);

const auth = firebase.auth();

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>{
    auth.createUserWithEmailAndPassword(email, password);
    console.log( email, password)
  }
    
  
  // Sign In
  export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);
  
  // Sign Out
  export const doSignOut = () =>
    auth.signOut();

export default fire;
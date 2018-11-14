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

export const auth = fire.auth();

const database = firebase.database();
const firestore = firebase.firestore();

console.log(firestore.collection("users").doc().get());

const provider = new firebase.auth.GoogleAuthProvider();
// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  
  // Sign In
export const doSignInWithEmailAndPassword = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
        .then( user => firestore.collection("users").doc(user.user.uid).get().then( qs => console.log(qs.data())
          )) 
    
}
  // Sign Out
export const doSignOut = () =>
    auth.signOut();


export default fire;
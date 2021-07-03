import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
firebase.initializeApp(firebaseConfig);
const Login = () => {
    const handleGoogleSignIn = ()=>{
        const googleprovider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(googleprovider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
    }
    
    return (
        <div>
            <button onClick={handleGoogleSignIn}>Google Sign</button>
        </div>
    );
};

export default Login;
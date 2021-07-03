import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

const Login = () => {
    const[user,setUser] = useState({}) 
    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const GITHUBProvider = new firebase.auth.GithubAuthProvider();
    const handleSignGoogle = ()=>{
        firebase.auth().signInWithPopup(provider)
  .then(result => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    const {displayName,email,photoURL} = result.user;
    console.log(displayName,email,photoURL);
    setUser(user);

    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    console.log(errorCode,errorMessage);
    
    // ...
  });
    }

    const handleSignFacebook = ()=>{
        firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
    console.log(user);
    setUser(user);
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorCode,errorMessage);
    // ...
  });

    }

    const handleSignGITHUB = ()=>{
        firebase.auth().signInWithPopup(GITHUBProvider)
        .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = credential.accessToken;

    // The signed-in user info.
    var user = result.user;
    console.log(user);
    setUser(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorCode,errorMessage);
    // ...
  });

    }


    return (
        <div>
            <button onClick={handleSignGoogle}>Sign in using Google</button>
            <br />
            <button onClick={handleSignFacebook}>Sign in using Facebook</button>
            <br />
            <button onClick={handleSignGITHUB}>Sign in using GITHUB</button>
            <h1>{user.displayName}</h1>
            <h1>{user.email}</h1>
            <img src={user.photoURL} alt="" />
        </div>
    );
};

export default Login;
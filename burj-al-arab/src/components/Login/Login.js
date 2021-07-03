import React  from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loginInUser,setLoginnUser] = useContext(UserContext);
    const handleGoogleSignIn = ()=>{
        const googleprovider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(googleprovider)
        .then((result) => {
            const {displayName,email}= result.user;
            const signInUser = {name: displayName,email};
            setLoginnUser(signInUser);
            console.log(signInUser);
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
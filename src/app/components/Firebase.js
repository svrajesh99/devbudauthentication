// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBdlKPdu6ay8FHV5c4adHoe_gqOaEEroW4",
  authDomain: "authtestfigma.firebaseapp.com",
  projectId: "authtestfigma",
  storageBucket: "authtestfigma.appspot.com",
  messagingSenderId: "236293878739",
  appId: "1:236293878739:web:492a006b7a32fcbcc43526"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();


  export const signInWithGoogle = async () => {
   const res =  await signInWithPopup(auth, provider);
   return res;
  };

  export const logOut = () => {
    signOut(auth)
}
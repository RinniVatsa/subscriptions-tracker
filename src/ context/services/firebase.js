// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEa4_WsSKp8mzxyPoOfcv9yzI0kCt99fA",
    authDomain: "subscription-tracker-2c2ec.firebaseapp.com",
    projectId: "subscription-tracker-2c2ec",
    storageBucket: "subscription-tracker-2c2ec.appspot.com",
    messagingSenderId: "829518921964",
    appId: "1:829518921964:web:c15adeee4f0d2fb6ae25c9",
    measurementId: "G-943NYB8MKX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


export { auth, provider, db }; //db export
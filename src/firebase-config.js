// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAii1MU4VrlJn4bIfx8v0h2TRChWgru3pw",
    authDomain: "blogproject-dc2c8.firebaseapp.com",
    projectId: "blogproject-dc2c8",
    storageBucket: "blogproject-dc2c8.appspot.com",
    messagingSenderId: "895764205282",
    appId: "1:895764205282:web:9b4d5c07a21108da2958bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// ! always import the below and check if it matches "firebase/auth"
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAnbgXtYqS8h5TjKS5gLk1RZy0T7mN2MCw",
  authDomain: "clone-d1f20.firebaseapp.com",
  projectId: "clone-d1f20",
  storageBucket: "clone-d1f20.appspot.com",
  messagingSenderId: "211585459576",
  appId: "1:211585459576:web:63ef8607b5b144f14fd48d",
  measurementId: "G-1LFM86XL66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth()
export const db=getFirestore(app)
export const provider =new GoogleAuthProvider()
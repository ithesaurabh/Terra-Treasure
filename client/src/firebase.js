// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "terratreasure-4cdee.firebaseapp.com",
  projectId: "terratreasure-4cdee",
  storageBucket: "terratreasure-4cdee.appspot.com",
  messagingSenderId: "19009795797",
  appId: "1:19009795797:web:0ba82bece9c3085da6d45c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
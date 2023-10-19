// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBMehUOJ7JuFTJLV6OpITRoJ0L4dFx4jLs",
  authDomain: "vbird-fa5eb.firebaseapp.com",
  projectId: "vbird-fa5eb",
  storageBucket: "vbird-fa5eb.appspot.com",
  messagingSenderId: "1079729750682",
  appId: "1:1079729750682:web:a9a2ff1d122fc04b339523",
  measurementId: "G-1FJD4WW8J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};

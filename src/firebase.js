// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
//import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Ozjgc-haLQYe1j9vnqCf9_1DXLGSBfE",
  authDomain: "shopping-list-app-ba216.firebaseapp.com",
  projectId: "shopping-list-app-ba216",
  storageBucket: "shopping-list-app-ba216.appspot.com",
  messagingSenderId: "12126559286",
  appId: "1:12126559286:web:c311547c3c31157d070c97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export const storage = getStorage(app);
export const db = getFirestore(app)
export const auth = getAuth()


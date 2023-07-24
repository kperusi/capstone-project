// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {

  apiKey: "AIzaSyBcmm-vzShrEjoOPsQHKMReWhRB3XcLLLA",

  authDomain: "capstone-project-759ec.firebaseapp.com",

  projectId: "capstone-project-759ec",

  storageBucket: "capstone-project-759ec.appspot.com",

  messagingSenderId: "184263212137",

  appId: "1:184263212137:web:78698f6e1f5e01417ff6f8"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()


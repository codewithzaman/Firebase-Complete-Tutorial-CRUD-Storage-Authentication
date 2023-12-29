// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAkkns5pWoRJCyGLHNPBK9CtRjJqV5oVm0",
  authDomain: "fir-tutorial-6ea72.firebaseapp.com",
  projectId: "fir-tutorial-6ea72",
  storageBucket: "fir-tutorial-6ea72.appspot.com",
  messagingSenderId: "869392763957",
  appId: "1:869392763957:web:ac50f57801891d6443757c"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
 export const googleProvider = new GoogleAuthProvider()
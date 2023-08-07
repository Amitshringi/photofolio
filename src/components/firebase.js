// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKCBCD74Tg9LYu-eYSS7tnUkT1KOyvbYE",
  authDomain: "photofolio-78b59.firebaseapp.com",
  projectId: "photofolio-78b59",
  storageBucket: "photofolio-78b59.appspot.com",
  messagingSenderId: "135143552829",
  appId: "1:135143552829:web:67d95d16ade5b39bcc3754"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe16rKeQkUiQVMiuWDbBtOts0UYML_sWw",
  authDomain: "destinationrecommendation.firebaseapp.com",
  projectId: "destinationrecommendation",
  storageBucket: "destinationrecommendation.firebasestorage.app",
  messagingSenderId: "985631166903",
  appId: "1:985631166903:web:e5c1a69c6e78891b3d9832",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

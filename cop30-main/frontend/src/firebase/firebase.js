// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD73yfNGJNtgoGqaKutDWxvG-y9ZF1sb20",
    authDomain: "simulador-energetico.firebaseapp.com",
    projectId: "simulador-energetico",
    storageBucket: "simulador-energetico.appspot.com",
    messagingSenderId: "159682717509",
    appId: "1:159682717509:web:698fd2acb0db4b3d41c02c",
    measurementId: "G-7R6FZFJJP2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
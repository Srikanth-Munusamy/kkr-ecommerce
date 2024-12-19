import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBxzduqIJ13e-OCvasGkiQBhgWGYfjjBFo",
  authDomain: "bengaluru-ecom.firebaseapp.com",
  projectId: "bengaluru-ecom",
  storageBucket: "bengaluru-ecom.appspot.com",
  messagingSenderId: "482384040683",
  appId: "1:482384040683:web:af5eef38d37568221364ae",
  measurementId: "G-HK0H6EERBR",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


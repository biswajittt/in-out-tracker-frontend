// Import the functions you need from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUHguwWkN_5OF_a1qLbl3VDP40x2WP8_w",
  authDomain: "inout-tracker-9d06f.firebaseapp.com",
  projectId: "inout-tracker-9d06f",
  storageBucket: "inout-tracker-9d06f.firebasestorage.app",
  messagingSenderId: "778472201466",
  appId: "1:778472201466:web:bbfba9b2ecae9f48fa7d43",
  measurementId: "G-0W9DWX2RKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

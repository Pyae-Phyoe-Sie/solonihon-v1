// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvdUTwY77p2NBAX6zxq80Mt3zLHAOHpbk",
  authDomain: "nextstep-b8298.firebaseapp.com",
  projectId: "nextstep-b8298",
  storageBucket: "nextstep-b8298.appspot.com",
  messagingSenderId: "291088607811",
  appId: "1:291088607811:web:6aa3e4f529bd68851402f6",
  measurementId: "G-V169E4VTCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
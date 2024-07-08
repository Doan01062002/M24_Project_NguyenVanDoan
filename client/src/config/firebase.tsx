// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC-b5B2WWzs_7bPDhWgARgwWc3-QThAWk",
  authDomain: "project-f6c67.firebaseapp.com",
  projectId: "project-f6c67",
  storageBucket: "project-f6c67.appspot.com",
  messagingSenderId: "1012151689517",
  appId: "1:1012151689517:web:83bcdc4b69fca2a36233a4",
  measurementId: "G-F58GZCYWVW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

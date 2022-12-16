// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4y0-yYrR37tR4BAaxRlxbxc1VN3OklSY",
  authDomain: "ntut-web-by-lucky-001.firebaseapp.com",
  databaseURL: "https://ntut-web-by-lucky-001-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ntut-web-by-lucky-001",
  storageBucket: "ntut-web-by-lucky-001.appspot.com",
  messagingSenderId: "431650785571",
  appId: "1:431650785571:web:7bb59aa365fc7abc80e496",
  measurementId: "G-ZRY5GE6KND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);

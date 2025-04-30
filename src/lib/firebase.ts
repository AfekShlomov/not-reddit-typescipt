// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgXErbjQEinxwqzjfhfQ5LI3OYdVpx3Fc",
  authDomain: "not-reddit-2b00b.firebaseapp.com",
  databaseURL: "https://not-reddit-2b00b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "not-reddit-2b00b",
  storageBucket: "not-reddit-2b00b.firebasestorage.app",
  messagingSenderId: "736043947093",
  appId: "1:736043947093:web:2b4ad1339ee78043ecb0dc",
  measurementId: "G-2MVQERJFX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
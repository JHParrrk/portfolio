// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo3FyWEsmyrD5rzjj7HdHihhDOum5_8Xw",
  authDomain: "parkjhfirebase.firebaseapp.com",
  projectId: "parkjhfirebase",
  storageBucket: "parkjhfirebase.firebasestorage.app",
  messagingSenderId: "30839109375",
  appId: "1:30839109375:web:7a22d11942415436113eca",
};

// Initialize Firebase
export const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

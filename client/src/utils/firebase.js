// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskontaskmanager.firebaseapp.com",
  projectId: "taskontaskmanager",
  storageBucket: "taskontaskmanager.firebasestorage.app",
  messagingSenderId: "335709619349",
  appId: "1:335709619349:web:b5a1197903cc81eb71c79c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

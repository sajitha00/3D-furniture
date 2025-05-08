// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // ✅ Import Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGgGLZgtYYXh6ay5yvjUeqG1vBPFIlkX4",
  authDomain: "ideal-abode.firebaseapp.com",
  projectId: "ideal-abode",
  storageBucket: "ideal-abode.appspot.com",
  messagingSenderId: "349376761182",
  appId: "1:349376761182:web:282c465d78a639dbc9d3cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // ✅ Initialize Auth

export { app, firestore, storage, auth }; // ✅ Export Auth

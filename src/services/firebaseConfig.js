import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAGgGLZgtYYXh6ay5yvjUeqG1vBPFIlkX4",
  authDomain: "ideal-abode.firebaseapp.com",
  projectId: "ideal-abode",
  storageBucket: "ideal-abode.appspot.com",
  messagingSenderId: "349376761182",
  appId: "1:349376761182:web:282c465d78a639dbc9d3cf",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); 

export { app, firestore, storage, auth, }; 
export const db = getFirestore(app);
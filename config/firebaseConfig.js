import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC9MApeZr0cEdWV69x82v2VK261XtUjwZE",
  authDomain: "think-apparel.firebaseapp.com",
  projectId: "think-apparel",
  storageBucket: "think-apparel.firebasestorage.app",
  messagingSenderId: "986515527464",
  appId: "1:986515527464:web:4575a69e3f76a8d8dfa21d",
  measurementId: "G-5BHR045W14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
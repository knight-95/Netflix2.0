// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDzsIU5XFPi_-qTTwfu5RFqu1coU8g2z08",
  authDomain: "netflixclone95.firebaseapp.com",
  projectId: "netflixclone95",
  storageBucket: "netflixclone95.appspot.com",
  messagingSenderId: "610601882704",
  appId: "1:610601882704:web:9584585f89b22c2b036d55",
  measurementId: "G-351L4L5GYV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {auth};
export default db;


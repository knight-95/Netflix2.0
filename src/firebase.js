import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDzsIU5XFPi_-qTTwfu5RFqu1coU8g2z08",
  authDomain: "netflixclone95.firebaseapp.com",
  projectId: "netflixclone95",
  storageBucket: "netflixclone95.appspot.com",
  messagingSenderId: "610601882704",
  appId: "1:610601882704:web:9584585f89b22c2b036d55",
  measurementId: "G-351L4L5GYV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;

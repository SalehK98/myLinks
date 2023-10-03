// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import firestore from "../firebase/firestore";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc7HKmKtlnrK4fLTpYsusvq86_RiiPkBs",
  authDomain: "mylinks-1632578191232.firebaseapp.com",
  databaseURL: "https://mylinks-1632578191232-default-rtdb.firebaseio.com",
  projectId: "mylinks-1632578191232",
  storageBucket: "mylinks-1632578191232.appspot.com",
  messagingSenderId: "74389734135",
  appId: "1:74389734135:web:256703f83f16cf42e089f2",
  measurementId: "G-KVKHS76J4J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// firebaseApps previously initialized using initializeApp()
const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);

export default db;

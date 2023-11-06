import * as ConfigConst from "./constants";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import firestore from "../firebase/firestore";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import * as firebaseui from "firebaseui";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ConfigConst.API_KEY,
  authDomain: ConfigConst.AUTH_DOMAIN,
  databaseURL: ConfigConst.DATABASE_URL,
  projectId: ConfigConst.PROJECT_ID,
  storageBucket: ConfigConst.STORAGE_BUCKET,
  messagingSenderId: ConfigConst.MESSAGING_SENDER_ID,
  appId: ConfigConst.APP_ID,
  measurementId: ConfigConst.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// firebaseApps previously initialized using initializeApp()
export const firestoreDb = getFirestore(app);
connectFirestoreEmulator(firestoreDb, "127.0.0.1", 8080);

export const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
export const googleProvided = new GoogleAuthProvider();

export const ui = new firebaseui.auth.AuthUI(auth);

export default { firestoreDb, auth, ui, googleProvided };

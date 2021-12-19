import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRh4-MBV5jQCdy8fYesmGDOQnpLZz3Mro",
  authDomain: "khana-app-d826d.firebaseapp.com",
  projectId: "khana-app-d826d",
  storageBucket: "khana-app-d826d.appspot.com",
  messagingSenderId: "1071861968317",
  appId: "1:1071861968317:web:e6726ee1a829428b18f6d4",
  measurementId: "G-RPQ1P4WWVD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export {
  app,
  db,
  auth,
  storage,
  ref,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  addDoc,
  signOut,
  doc,
  updateDoc,
  collection,
  getDoc,
  updatePassword,
  sendPasswordResetEmail,
  uploadBytes,
  getDownloadURL,
};

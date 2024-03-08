const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCP7HidJQM2Ch2xwbIs8zvXfinv3e0bexo",
  authDomain: "project-6f6e0.firebaseapp.com",
  projectId: "project-6f6e0",
  storageBucket: "project-6f6e0.appspot.com",
  messagingSenderId: "409679254529",
  appId: "1:409679254529:web:8c09897998ab7a8587dc00",
  measurementId: "G-PY2MN9QTVP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
module.exports = {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
};
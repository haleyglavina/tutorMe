// This code referenced from https://github.com/satansdeer/react-firebase-auth
// by Maksim Ivanov

import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBHR9ao9S7M19Uux4YQ91OFhgGC6lHrRBc",
  authDomain: "tutor-me-f97ef.firebaseapp.com",
  databaseURL: "https://tutor-me-f97ef.firebaseio.com",
  projectId: "tutor-me-f97ef",
  storageBucket: "tutor-me-f97ef.appspot.com",
  messagingSenderId: "118601336948"
});

export default app;
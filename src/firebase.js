import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyB13Sr-H1v9poVwntEcqzHQytHhZBfFgRU",
    authDomain: "final-year-project-c2201.firebaseapp.com",
    projectId: "final-year-project-c2201",
    storageBucket: "final-year-project-c2201.appspot.com",
    messagingSenderId: "389469261809",
    appId: "1:389469261809:web:a2c6a736e49d1cce2cfe50"
  };
  
const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export {fb,db}

import * as firebase from 'firebase'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAmMJK7dZtkw0W5YLW8Dp9UFGS1JtvxUcw",
    authDomain: "evolve-1.firebaseapp.com",
    databaseURL: "https://evolve-1.firebaseio.com",
    projectId: "evolve-1",
    storageBucket: "evolve-1.appspot.com",
    messagingSenderId: "1095414449737"
  };
  firebase.initializeApp(config);
export const database = firebase.database().ref('/notes')
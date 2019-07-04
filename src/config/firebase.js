import * as firebase from "firebase";

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDPxFtI369o27iMDAzCqpcwONuUJWe-byY",
  authDomain: "leish-app.firebaseapp.com",
  databaseURL: "https://leish-app.firebaseio.com",
  projectId: "leish-app",
  storageBucket: "",
  messagingSenderId: "495573899795",
  appId: "1:495573899795:web:8c45a6ad1ad4c937"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
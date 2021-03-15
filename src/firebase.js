import firebase from "firebase" ;





const firebaseApp = firebase.initializeApp ({


  apiKey: "AIzaSyBENC3kGd47Oz6-UlLllWvw10NAN7S0ip8",
authDomain: "instagram-clone-react-c145e.firebaseapp.com",
databaseURL: "https://instagram-clone-react-c145e-default-rtdb.firebaseio.com",
projectId: "instagram-clone-react-c145e",
storageBucket: "instagram-clone-react-c145e.appspot.com",
messagingSenderId: "170455389632",
appId: "1:170455389632:web:ef53b4f1d7fa2a20c42425",
measurementId: "G-XWM9YNV9F2"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};

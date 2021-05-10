import firebase from 'firebase';
require('@firebase/firestore')

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBgBZVGd7P27FhSJCdpIeYWEmAczXEJ_1c",
    authDomain: "bartersystem-aea6f.firebaseapp.com",
    projectId: "bartersystem-aea6f",
    storageBucket: "bartersystem-aea6f.appspot.com",
    messagingSenderId: "993769644035",
    appId: "1:993769644035:web:88eed12da79538ec166e36"
  };
 
  firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp({});
}
//export default firebase.database() 
var db = firebase.firestore(); 
export default db;
import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCaM4b3QK76OxixjZhHfQagqZzVNWAXlFs",
  authDomain: "react-native-firebase-cded0.firebaseapp.com",
  projectId: "react-native-firebase-cded0",
  storageBucket: "react-native-firebase-cded0.appspot.com",
  messagingSenderId: "693339102775",
  appId: "1:693339102775:web:ce64e5ef51ce897d5969b2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};

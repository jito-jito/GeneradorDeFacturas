// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcAdxiVzjU3RfffKu0AbcOr65p1eqaQuM",
  authDomain: "generador-de-facturas.firebaseapp.com",
  projectId: "generador-de-facturas",
  storageBucket: "generador-de-facturas.appspot.com",
  messagingSenderId: "451855567870",
  appId: "1:451855567870:web:8a892c42ddd9806b238eaf",
  measurementId: "G-YB5VM5J9BC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getDatabase();
const connectedRef = ref(db, ".info/connected");
onValue(connectedRef, (snap) => {
  if (snap.val() === true) {
    console.log("connected");
  } else {
    console.log("not connected");
  }
});

const dbRef = ref(getDatabase());
get(child(dbRef, `Products`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

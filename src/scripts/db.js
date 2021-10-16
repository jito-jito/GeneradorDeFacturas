import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyCcAdxiVzjU3RfffKu0AbcOr65p1eqaQuM",
  authDomain: "generador-de-facturas.firebaseapp.com",
  projectId: "generador-de-facturas",
  storageBucket: "generador-de-facturas.appspot.com",
  messagingSenderId: "451855567870",
  appId: "1:451855567870:web:8a892c42ddd9806b238eaf",
  measurementId: "G-YB5VM5J9BC"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Get a list of cities from your database
async function getData(name) {
  const citiesCol = collection(db, name);
  const citySnapshot = await getDocs(citiesCol);
  const cityList = await citySnapshot.docs.map(doc => doc.data());
  return cityList;
}


export { getData }
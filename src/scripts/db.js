import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "generador-de-facturas.firebaseapp.com",
  projectId: "generador-de-facturas",
  storageBucket: "generador-de-facturas.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
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
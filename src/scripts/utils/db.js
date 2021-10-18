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

// Get a list of data from your database
async function getData(name) {
  const dataCol = collection(db, name);
  const dataSnapshot = await getDocs(dataCol);
  const dataList = await dataSnapshot.docs.map(doc => doc.data());
  return dataList;
}


export { getData }
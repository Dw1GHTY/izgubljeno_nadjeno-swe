import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
//const { applicationDefault, cert } = require('firebase-admin/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyQbX29X8S4-Jo18zodrggGP9uSTTKc2g",
  authDomain: "izgubljenonadjeno-jjm.firebaseapp.com",
  databaseURL: "https://izgubljenonadjeno-jjm-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "izgubljenonadjeno-jjm",
  storageBucket: "izgubljenonadjeno-jjm.appspot.com",
  messagingSenderId: "905472938324",
  appId: "1:905472938324:web:d5f91bebea86f6c73c78c1",
  measurementId: "G-KZNREYKWL5"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth(app);

export default app;
export { db, storage, auth };





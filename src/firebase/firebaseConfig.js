import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAaoJ6CVN90w0FQO8vjY7JQlYeyzGWiM5U",
  authDomain: "fintechapp-13e2c.firebaseapp.com",
  projectId: "fintechapp-13e2c",
  storageBucket: "fintechapp-13e2c.appspot.com",
  messagingSenderId: "9577798752",
  appId: "1:9577798752:web:5471c0d43531e5db717705",
  measurementId: "G-VCX9XHKTG9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

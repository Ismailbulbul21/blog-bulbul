import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAkn7AO_M8LutYD8cyatdLX2-CQJd_qv24",
  authDomain: "blog-plost205.firebaseapp.com",
  projectId: "blog-plost205",
  storageBucket: "blog-plost205.appspot.com",
  messagingSenderId: "116912713357",
  appId: "1:116912713357:web:ed93bba2fa5e6a2f86fcc4",
  measurementId: "G-K308EFJ060"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 
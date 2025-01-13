import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBku8KYWEPKW21PEf2l3LwXZmO_WwPGPEM",
  authDomain: "m13345.firebaseapp.com",
  databaseURL: "https://m13345-default-rtdb.firebaseio.com",
  projectId: "m13345",
  storageBucket: "m13345.firebasestorage.app",
  messagingSenderId: "411133272100",
  appId: "1:411133272100:web:ee339501f1d72a310378b1",
  measurementId: "G-LHQ3REWMFG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBWKMy315wSI8tfYbP3reS8H_6QTQDPEsM',
  authDomain: 'pausaconsciente-f7e95.firebaseapp.com',
  projectId: 'pausaconsciente-f7e95',
  storageBucket: 'pausaconsciente-f7e95.firebasestorage.app',
  messagingSenderId: '957611165072',
  appId: '1:957611165072:web:7987ea0f4a4d6bf63f1f15',
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

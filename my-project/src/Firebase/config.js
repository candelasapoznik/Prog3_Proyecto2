import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCGf3UzUw_b0_I-W2k-c8NQQ-AieiKV7hw",
  authDomain: "proyectoint-f0e37.firebaseapp.com",
  projectId: "proyectoint-f0e37",
  storageBucket: "proyectoint-f0e37.appspot.com",
  messagingSenderId: "930324666743",
  appId: "1:930324666743:web:c97117dec67a5bd3e3e972"
};
  app.initializeApp(firebaseConfig);
  export const auth= firebase.auth();
  export const storage= app.storage();
  export const db = app.firestore();

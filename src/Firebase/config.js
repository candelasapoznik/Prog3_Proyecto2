import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC433J5s_Hss10sKhU93E1eYlcXYP85GMU",
    authDomain: "prueba1-ac3e1.firebaseapp.com",
    projectId: "prueba1-ac3e1",
    storageBucket: "prueba1-ac3e1.appspot.com",
    messagingSenderId: "692286112777",
    appId: "1:692286112777:web:0dbfc7d7a10a116b62e4d8"
  };
  app.initializeApp(firebaseConfig);
  export const auth= firebase.auth();
  export const storage= app.storage();
  export const db = app.firestore();

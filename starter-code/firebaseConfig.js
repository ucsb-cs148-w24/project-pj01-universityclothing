import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    // move to .ens later
    apiKey: "AIzaSyDR87GgBj0aOnBJ036ajWgCGT6NSlsaHlU",
    authDomain: "pj01-universityclothing.firebaseapp.com",
    databaseURL: "https://pj01-universityclothing.firebaseio.com",
    projectId: "pj01-universityclothing",
    storageBucket: "pj01-universityclothing.appspot.com",
    messagingSenderId: "402529839560",
    appId: "1:402529839560:ios:794d6ea342486d070478fd",
    // measurementId: 'G-measurement-id',
};

// firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
// firestore is the firebase database we can read and write to
const firestore = getFirestore(firebaseApp);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
//const db = getFirestore(firebaseApp)

export { firebaseApp, firestore };
export const storage = getStorage(firebaseApp);

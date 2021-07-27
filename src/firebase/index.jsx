
import firebase from "firebase/app";
import "@firebase/firestore";

// Initialize Firebase
const app = firebase.initializeApp({
    apiKey: "AIzaSyDy6zdLjdLmpFeQObgBsvbKIAgtBDIynqg",
    authDomain: "proyecto-frm.firebaseapp.com",
    projectId: "proyecto-frm",
    storageBucket: "proyecto-frm.appspot.com",
    messagingSenderId: "180736778651",
    appId: "1:180736778651:web:dd7481a0ec79a8fccdc13e"
});

export const getFirestore = () => {
    return firebase.firestore(app);
}
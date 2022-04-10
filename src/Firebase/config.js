// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDrQgRvlwJlapeDrx8no37A2j2ruRJ85i4",
    authDomain: "umee-team3.firebaseapp.com",
    projectId: "umee-team3",
    storageBucket: "umee-team3.appspot.com",
    messagingSenderId: "80647325647",
    appId: "1:80647325647:web:229db56f313bd9dfe9b4ba",
    measurementId: "G-192BHGT9GV"
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const storage = getStorage(firebase)

export {storage}
export default firebase
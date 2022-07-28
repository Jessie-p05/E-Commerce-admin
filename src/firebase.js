// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKhpbt8X1loEeMSNYhG95pHUYQLEYGfN0",
  authDomain: "e-commerce-d579f.firebaseapp.com",
  projectId: "e-commerce-d579f",
  storageBucket: "e-commerce-d579f.appspot.com",
  messagingSenderId: "848974994605",
  appId: "1:848974994605:web:7bd2fb9f848c662acbfa24",
  measurementId: "G-LJRBM05JEW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
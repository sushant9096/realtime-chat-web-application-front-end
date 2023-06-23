import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAM4mOp8wGbKqaTeSkj4oS-loI7JbPRPV4",
  authDomain: "realtimechatwebapplication.firebaseapp.com",
  projectId: "realtimechatwebapplication",
  storageBucket: "realtimechatwebapplication.appspot.com",
  messagingSenderId: "430298983690",
  appId: "1:430298983690:web:0e7e6af31f11d61ef35ef3",
  measurementId: "G-0JEQP8GVBS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

export {firebaseApp, firebaseAnalytics, firebaseAuth};
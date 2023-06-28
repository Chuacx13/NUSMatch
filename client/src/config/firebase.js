import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBvgklrjezNB5HzdFzbs24kGzynCQzEfVw",
  authDomain: "authentication-nusmatch.firebaseapp.com",
  projectId: "authentication-nusmatch",
  storageBucket: "authentication-nusmatch.appspot.com",
  messagingSenderId: "954431712934",
  appId: "1:954431712934:web:989111dc268c6d2e6e8e67",
  measurementId: "G-HPPN8C3NF1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
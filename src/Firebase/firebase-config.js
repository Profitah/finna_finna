import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC6daCGzIjy4GR5_zikPl7HK6D29NaU6Kw",
    authDomain: "dofarming-f484a.firebaseapp.com",
    projectId: "dofarming-f484a",
    storageBucket: "dofarming-f484a.appspot.com",
    messagingSenderId: "116639712331",
    appId: "1:116639712331:web:0d29729b913d8ad5e4f9ce",
    measurementId: "G-739Y90N6WP"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };

import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZZmyIY87Fji5JLMxWLFqV_l2y-TsdSEQ",
    authDomain: "tuservicio-b2cf3.firebaseapp.com",
    projectId: "tuservicio-b2cf3",
    storageBucket: "tuservicio-b2cf3.appspot.com",
    messagingSenderId: "792767039859",
    appId: "1:792767039859:web:b73e0e7889104a75c55d06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

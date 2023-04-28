
// import { initializeApp } from "firebase/app";
// import {getFirestore} from 'firebase/firestore';
// import  'firebase/auth'
import * as firebase from 'firebase/app'
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
  const app = firebase.initializeApp({
    apiKey: "AIzaSyDZZmyIY87Fji5JLMxWLFqV_l2y-TsdSEQ",
    authDomain: "tuservicio-b2cf3.firebaseapp.com",
    projectId: "tuservicio-b2cf3",
    storageBucket: "tuservicio-b2cf3.appspot.com",
    messagingSenderId: "792767039859",
    appId: "1:792767039859:web:b73e0e7889104a75c55d06"
});


// export const app = initializeApp(firebaseConfig);
export default app;

 


import * as firebase from 'firebase/app'
import {getStorage} from '@firebase/storage';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';


    const app = firebase.initializeApp({
    apiKey: "AIzaSyDZZmyIY87Fji5JLMxWLFqV_l2y-TsdSEQ",
    authDomain: "tuservicio-b2cf3.firebaseapp.com",
    projectId: "tuservicio-b2cf3",
    storageBucket: "tuservicio-b2cf3.appspot.com",
    messagingSenderId: "792767039859",
    appId: "1:792767039859:web:b73e0e7889104a75c55d06"
});


export const auth = getAuth()
export default app;
 export const storage = getStorage(app);


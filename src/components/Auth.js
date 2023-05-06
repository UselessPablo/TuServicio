// import React from 'react'
// import 'firebase/auth'
// import { useState } from 'react'
// import  app  from '../utils/Firebase';
// import { useEffect } from 'react';
// import { auth } from 'firebase/auth';


// export const AuthContext = React.createContext();
// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null)

//     // useEffect(() => {
//     //     app.auth().onAuthStateChange(setCurrentUser);
//     // }, [])
//     useEffect(() => {
//         auth(app).onAuthStateChanged(setCurrentUser);
//     }, [])

//     return (
//         <AuthContext.Provider
//             value={{
//                 currentUser
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }
import React from 'react';
import { useState, useEffect } from 'react';
import 'firebase/auth';
import app, { auth } from '../utils/Firebase';


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
   
    useEffect(() => {
        auth.onAuthStateChanged( setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};







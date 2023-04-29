import React from 'react'
import 'firebase/auth'
import { useState } from 'react'
import  app  from '../utils/Firebase';
import { useEffect } from 'react';


export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        app.auth().onAuthStateChange(setCurrentUser);
    }, [])


    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

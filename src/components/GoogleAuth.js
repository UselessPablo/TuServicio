import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { Box, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
const auth = getAuth();

const GoogleAuth = ({ setUser }) => {
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            
        });
        return unsubscribe;
    }, [setUser]);

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <Button sx={{color:'black', backgroundColor:'secondary.main', mt:3,ml:2}} onClick={handleLogin}> Logueate con <GoogleIcon color='success'/>oogle</Button>
        </Box>
    );
};

export default GoogleAuth;

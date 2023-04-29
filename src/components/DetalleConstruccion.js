import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import  app from '../utils/Firebase';
import Construccion from './Construccion';
import { CircularProgress, Box } from '@mui/material';
import { getFirestore } from 'firebase/firestore'

const DetalleConstruccion = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const app = getFirestore();
    useEffect(() => {
        const q = query(collection(app, 'empleados'), where('categoria', '==', 'constructor'));
        getDocs(q)
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setLoading(false);
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
                    <CircularProgress color='secondary' size='130px' />
                    
                </Box>
            ) : (
                <Construccion data={data} />
            )}
        </>
    );
};

export default DetalleConstruccion;

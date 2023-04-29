import React from 'react'
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where} from 'firebase/firestore';
import app from '../utils/Firebase'
import Plomeria from '../components/Plomeria';
import { Box, Skeleton } from '@mui/material';
import { getFirestore } from 'firebase/firestore'


const DetallePlomeria = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const app = getFirestore();
    useEffect(() => {
        const q = query(collection(app, 'empleados'), where('categoria', '==', 'plomero'));
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
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Skeleton variant="rectangular" sx={{width:160, height:180, padding:1, margin:1}} />
                    <Skeleton variant="rectangular" sx={{ width: 160, height: 180, padding: 1, margin: 1 }} />
                    <Skeleton variant="rectangular" sx={{ width: 160, height: 180, padding: 1, margin: 1 }} />
                    <Skeleton variant="rectangular" sx={{ width: 160, height: 180, padding: 1, margin: 1 }} />
                    <Skeleton variant="rectangular" sx={{ width: 160, height: 180, padding: 1, margin: 1 }} />
                </Box>
            ) : (
                <Plomeria data={data} />
            )}
        </>
    );
};

export default DetallePlomeria;

import React from 'react';
import { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../utils/Firebase';
import Gasistas from './Gasistas';

const Gas = () => {
    const [data, setData] = useState([]);
   
    useEffect(() => {
        const q = query(collection(db, 'empleados'), where('categoria', '==', 'gasista'));
        getDocs(q)
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
   
    

    return (
        <Gasistas data={data}/>
        
    );
};

export default Gas;
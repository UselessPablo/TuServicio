import React from 'react'
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../utils/Firebase'
import Plomeria from '../components/Plomeria';

const DetallePlomeria = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'empleados'), where('categoria', '==', 'plomero'));
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
       <Plomeria data={data} />
    )
}

export default DetallePlomeria
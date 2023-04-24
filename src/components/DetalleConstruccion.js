import React from 'react'
import {useState, useEffect} from 'react';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../utils/Firebase';
import Construccion from './Construccion';

const DetalleConstruccion = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'empleados'), where('categoria', '==', 'constructor'));
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
       <Construccion data={data} />
    )
}

export default DetalleConstruccion
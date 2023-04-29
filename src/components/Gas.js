import React from 'react';
import { useState, useEffect } from 'react';
import {getDocs, collection, query, where, getFirestore} from 'firebase/firestore';
import Gasistas from './Gasistas';


const Gas = () => {
    const [data, setData] = useState([]);
   const app = getFirestore();
    useEffect(() => {
        const q = query(collection(app, 'empleados'), where('categoria', '==', 'gasista'));
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
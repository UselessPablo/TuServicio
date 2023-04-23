import React from 'react'
import { useState, useEffect } from 'react';
import { collection, getDocs} from 'firebase/firestore';
import {db} from '../utils/Firebase'
import Plomeria from '../components/Plomeria';

const DetallePlomeria = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        const queryCollection = collection(db, 'empleados'); // use collection() instead of doc()
        getDocs(queryCollection)
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(data);
          console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
        },[])
            return (
       <Plomeria data={data} />
    )
}

export default DetallePlomeria
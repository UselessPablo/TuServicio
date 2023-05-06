import React from 'react'
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import Carrousel from '../components/Carrousel'
import { getFirestore } from 'firebase/firestore'


const DetalleBest = () => {
    const app = getFirestore();
    const [data, setData] = useState([]);

    useEffect(() => {
        const coleccionDeEmpleados = collection(app, 'empleados');
        getDocs(coleccionDeEmpleados)
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
    console.log(data);


    return (
        <div>
            <Carrousel data={data} />
        </div>
    );
}
export default DetalleBest;

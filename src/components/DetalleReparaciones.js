import React from 'react'
import {useState, useEffect} from 'react';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '../utils/Firebase';
import Reparaciones from './Reparaciones'

const DetalleReparaciones = () => {
  
      const [data, setData] = useState([]);
   
    useEffect(() => {
        const coleccionDeEmpleados = collection(db, 'empleados');
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
    <Reparaciones data={data}/>
    </div>
  )
}

export default DetalleReparaciones
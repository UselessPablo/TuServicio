import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import ItemDetail from './ItemDetail';

const DetalleCard = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        const app = getFirestore();
        const queryDoc = doc(app, 'empleados', id)
        getDoc(queryDoc)
            .then(res => setData({ id: res.id, ...res.data() }))
    }, [id])

    return (
        <ItemDetail data={data} />
    );
};

export default DetalleCard;
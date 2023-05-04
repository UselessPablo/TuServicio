import React from 'react'
import { useState, useContext } from 'react'
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { getFirestore} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../utils/Firebase'

const userContext = React.createContext();

const firestore = getFirestore();
const auth = getAuth();
export const useFavoriteContext = () => {
  return useContext(userContext)
}

export const UserProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([])
  
  const handleFavoriteClick = async (id, nombre, imagen, categoria) => {
    const user = auth.currentUser;
    if (!user) {
      // Si no hay un usuario autenticado, no se pueden agregar favoritos.
      console.log('Debes iniciar sesión para agregar favoritos.');
      return;
    }
    
    const userRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(userRef);
    const userData = docSnap.data() || {};
    const { favoritos = {} } = userData;
    const isCurrentlyFavorite = !!favoritos[id];
    setFavoritos((prevFavorites) => ({
      ...prevFavorites,
      [id]: {
        id,
        nombre,
        imagen,
        categoria,
        isFavorite: !isCurrentlyFavorite
      },
    }));
    await setDoc(userRef, {
      favoritos: {
        ...favoritos,
        [id]: {
          id,
          nombre,
          imagen,
          categoria,
          isFavorite: !isCurrentlyFavorite
        },
      },
    }, { merge: true });
  };
  const handleDeleteFavorite = async (id) => {
    const user = auth.currentUser;
    if (!user) {
      // Si no hay un usuario autenticado, no se pueden eliminar favoritos.
      console.log('Debes iniciar sesión para eliminar favoritos.');
      return;
    }

    const userRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(userRef);
    const userData = docSnap.data() || {};
    const { favoritos = {} } = userData;
    const newFavorites = { ...favoritos };
    delete newFavorites[id];
    setFavoritos(newFavorites);
    await setDoc(userRef, { favoritos: newFavorites }, { merge: true });

    // Actualiza la lista de favoritos en el estado del componente.
    setFavoritos(Object.values(newFavorites));
  };

  return (
    <userContext.Provider value={{ favoritos, handleFavoriteClick, handleDeleteFavorite, 
     }}>
      {children}
    </userContext.Provider>

  )
}

export default UserProvider;

import React from 'react'
import { useState, useContext } from 'react'
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { getFirestore} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../utils/Firebase'
import { deleteDoc, collection, getDocs } from 'firebase/firestore';

export const userContext = React.createContext();



export const useFavoriteContext = () => {
  return useContext(userContext)
}

export const UserProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const addFavorite = (id, nombre, imagen, categoria) => {
    const newFavorite = { id, nombre, imagen, categoria };
    setFavoritos((prevFavorites) => [...prevFavorites, newFavorite]);
  };

  const handleFavoriteDelete = (id) => {
    const filteredFavorites = favoritos.filter((favorite) => favorite.id !== id);
    setFavoritos(filteredFavorites);
  };

  return (
    <userContext.Provider
      value={{
        favoritos,
        addFavorite,
        handleFavoriteDelete,
      }}
    >
      {children}
    </userContext.Provider>
  );
};


export default UserProvider;

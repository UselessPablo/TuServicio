import React, { useState, useContext } from 'react';
import {  deleteDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';


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

  const handleFavoriteDelete = async (id) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'favorites', id));
      const updatedFavorites = favoritos.filter((favorite) => favorite.id !== id);
      setFavoritos(updatedFavorites);
    } catch (error) {
      console.error('Error deleting favorite: ', error);
    }
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

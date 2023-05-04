import { useEffect, useState } from 'react';
import { useFavoriteContext } from '../components/UserProvider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Badge, Box, Typography, Button, Modal, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firestore = getFirestore();
const auth = getAuth();
function Favorites() {
    const { favoritos } = useFavoriteContext();
    const [favorites, setFavorites] = useState([]);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (favoritos) {
            setFavorites(Object.values(favoritos));
        }
    }, [favoritos]);

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDelete = (id) => {
        handleDeleteFavorite(id).then(() => {
            const updatedFavorites = favorites.filter(favorite => favorite.id !== id);
            setFavorites(updatedFavorites);
        });
    };
    const handleDeleteFavorite = async (id) => {
        const user = auth.currentUser;
        if (!user) {
            console.log('Debes iniciar sesión para eliminar favoritos.');
            return;
        }

        const userRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        const userData = docSnap.data() || {};
        const { favoritos = {} } = userData;
        const newFavorites = { ...favoritos };
        delete newFavorites[id];
        await setDoc(userRef, { favoritos: newFavorites }, { merge: true });

        // Actualiza la lista de favoritos en el estado del componente.
        const updatedFavorites = Object.values(newFavorites);
        setFavorites(updatedFavorites);
    };

    const handleToggleFavorite = async (id) => {
        const user = auth.currentUser;
        if (!user) {
            console.log('Debes iniciar sesión para agregar favoritos.');
            return;
        }

        const userRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        const userData = docSnap.data() || {};
        const { favoritos = {} } = userData;
        const isCurrentlyFavorite = !!favoritos[id];
        await setDoc(userRef, {
            favoritos: {
                ...favoritos,
                [id]: {
                    ...favoritos[id],
                    isFavorite: !isCurrentlyFavorite
                },
            },
        }, { merge: true });

        // Actualiza el estado local de favoritos.
        const updatedFavorites = Object.values(favoritos).map((favorite) => {
            if (favorite.id === id) {
                return {
                    ...favorite,
                    isFavorite: !isCurrentlyFavorite
                };
            }
            return favorite;
        });
        setFavorites(updatedFavorites);
    };

   

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
            <Button onClick={handleOpen}>
                <Badge badgeContent={favorites.length} color="red">
                    <FavoriteIcon color={open ? 'success' : 'success'} />
                </Badge>
            </Button>
            <Modal
                sx={{ display: 'flex', justifyContent: 'center', minWidth: '80vw' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'white', width: '80vw', height: '50%', p: 3, mt:5 }}>
                    <Typography variant="h5" component="h2" sx={{ my: 2 }}>
                        Favoritos
                    </Typography>
                    {favorites.length > 0 && (
                        <Box  >
                            {favorites.map((favorite) => (
                                <Box key={favorite.id}>
                                    {favorite && (
                                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Link className='favoritos' to={`/detalle/${favorite.id}`} onClick={() => { handleClose && handleClose() }}>
                                                <Typography>{favorite.nombre}</Typography>
                                                <Typography sx={{ margin: 1, color: 'black' }}>{favorite.categoria}</Typography>
                                                <Avatar variant='rounded' src={favorite.imagen} sx={{ mr: 1 }} />
                                            </Link>
                                            <Button onClick={() => handleDelete(favorite.id)}>eliminar</Button>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    )}
                    <Button onClick={handleClose} color='pop' size='small' variant='contained' sx={{ mt: 1 }}>Cerrar</Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default Favorites;

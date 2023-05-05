import { useEffect, useState } from 'react';
import { useFavoriteContext } from '../components/UserProvider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Badge, Box, Typography, Button, Modal, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const firestore = getFirestore();
const auth = getAuth();

function Favorites() {
    const { favoritos, handleFavoriteDelete, } = useFavoriteContext();
    const [favorites, setFavorites] = useState([]);
    const [open, setOpen] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false); // variable que indica si el usuario está logueado o no

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLoggedIn(true);
                const userRef = doc(firestore, 'users', user.uid);
                getDoc(userRef).then((docSnap) => {
                    const userData = docSnap.data() || {};
                    const { favoritos = {} } = userData;
                    setFavorites(Object.values(favoritos));
                    favoritos(favorites.id);
                });
            } else {
                setUserLoggedIn(false);
                setFavorites([]);
                favoritos([]);
            }
        });
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

  

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {userLoggedIn && ( // se agrega una condición para mostrar los favoritos solo si el usuario está logueado
                <Button onClick={handleOpen}>
                    <Badge badgeContent={favoritos.length} color="red">
                        <FavoriteIcon color={open ? 'info' : 'grey'} />
                    </Badge>
                </Button>
            )}
            <Modal
                sx={{ display: 'flex', justifyContent: 'center', minWidth: '80vw' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', backgroundColor: 'white', width: '80vw', height: '50%', p: 3, mt:5 }}>
                    <Typography variant="h5" component="h2" sx={{ my: 2 }}>
                        Favoritos
                    </Typography>
                    {favorites.length > 0 && (
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}  >
                            {favoritos.map((favorite) => (
                                <Box key={favorite.id} sx={{display:'flex', alignItems:'center', }}>
                                    <Link className='favoritos' to={`/detalle/${favorite.id}`}>
                                        <Avatar src={favorite.imagen} alt={favorite.nombre} variant='rounded' />
                                    <Box>{favorite.nombre}</Box>
                                    <Box>{favorite.categoria}</Box>
                                    </Link>
                                    <Button size='small'  onClick={() => handleFavoriteDelete(favorite.id)}>
                                      <RemoveCircleOutlineIcon color='red'/>
                                       
                                    </Button>
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

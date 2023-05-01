
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import PropaneTankRoundedIcon from '@mui/icons-material/PropaneTankRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import FormatPaintRoundedIcon from '@mui/icons-material/FormatPaintRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Avatar, Badge, Menu, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import FavoriteIcon from '@mui/icons-material/Favorite'
import app from '../utils/Firebase';

const auth = getAuth(app);
const NavBar = ({ avatar, user, nombre, apellido, telefono }) => {
    const app = getFirestore();
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({ left: false });
    const [favoritos, setFavoritos] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [favoritesMenuOpen, setFavoritesMenuOpen] = useState(false);
    const [favoritesLoaded, setFavoritesLoaded] = useState(false);
    const navigate = useNavigate();
    console.log(user);
    const toggleDrawer = (anchor, open) => {
        setState({ ...state, [anchor]: open });
    };

    const goHome = () => {
        navigate('/');
        toggleDrawer('left', false);
    }
    const goPlomeria = () => {
        navigate('/DetalleAgua')
        toggleDrawer('left', false);
    }
    const goGasista = () => {
        navigate('/Gasistas')
        toggleDrawer('left', false);

    }
    const goReparaciones = () => {
        navigate('/Reparaciones')
        toggleDrawer('left', false);
    }
    const goConstruccion = () => {
        navigate('/Construccion')
        toggleDrawer('left', false);
    }
    const register = () => {
        navigate('/Login')
    }
    const info = () => {
        navigate('/Info')
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickMenu = (event) => {
        console.log('Mostrar favoritos'); // Agregar esta línea
        setAnchorEl(event.currentTarget);
        setFavoritesMenuOpen(true);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setFavoritesMenuOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    
    const handleFavoriteMenuOpen = (event) => {
        console.log('Mostrar mis favoritos'); // Agregar esta línea
        setAnchorEl(event.currentTarget);
        const user = auth.currentUser;
        if (user && favoritesLoaded) {
            const userRef = doc(app, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (doc) => {
                const userData = doc.data() || {};
                const { favorites = {} } = userData;
                const favoriteEntries = Object.entries(favorites)
                    .filter(([id, value]) => value.isFavorite)
                    .map(([id, value]) => ({ id, nombre: value.nombre }));
                setFavoritos(favoriteEntries);
            });
            return () => unsubscribe();
        }
    };









    const handleFavoritesMenuClose = () => {
        setFavoritesMenuOpen(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(app, 'users', user.uid);
                const docSnap = await getDoc(userRef);
                const userData = docSnap.data() || {};
                const { favorites = {} } = userData;
                setFavoritos(Object.keys(favorites));
            } else {
                setFavoritos([]);
            }
            setFavoritesLoaded(true);
        });

        console.log(favoritos); // Agregar esta línea

        return unsubscribe;
    }, [user, app]);

    return (

        <Box sx={{ flexGrow: 1, padding: 1, width: '98%' }}>

            <AppBar position="sticky" elevation='0' sx={{ backgroundColor: 'transparent', pb: 2 }}>
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="left"
                        color="inherit"
                        aria-label="menu"
                        sx={{}}
                        onClick={() => toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h1" fontSize='1.4rem' component="div" fontWeight='bold' sx={{ flexGrow: 1, ml: 2 }}>
                        TuServicio
                    </Typography>
                    <Box sx={{ ml: 4, display: 'flex', flexDirection: 'column-reverse', justifyContent: 'center' }}>
                        <Button onClick={register} color="success" variant='contained' size='small' sx={{ maxHeight: 27, padding: 1, mt: 1, width: '50%' }}>Login</Button>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                            <Button onClick={handleClickOpen} >
                                <Avatar src={avatar} sx={{}} alt={user} />
                            </Button>
                        </Box>

                        <Dialog open={open} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '400px', textAlign: 'center' }}>
                            <Avatar src={avatar} sx={{ ml: 2, mt: 2 }} />
                            <DialogTitle sx={{ textAlign: 'start', color: 'info2.main' }}>Hola, {nombre}</DialogTitle>

                            <DialogContent >
                                <List>
                                    <ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography fontWeight='bold' sx={{ mb: 2 }} > Datos: </Typography>
                                        <Typography>Usuario:{user} </Typography>
                                        <Typography>Nombre:  {nombre}</Typography>
                                        <Typography>Apellido: {apellido}</Typography>
                                        <Typography>Contacto:  {telefono}</Typography>
                                    </ListItem>
                                </List>
                                <Box>
                                    <IconButton
                                        aria-label="favorite"
                                        aria-controls="favorite-menu"
                                        aria-haspopup="true"
                                        onClick={handleClickMenu}
                                        color="inherit"
                                    >
                                        <Badge badgeContent={favoritos.length} color="secondary">
                                            <FavoriteBorderIcon />
                                        </Badge>
                                        {/* menú de favoritos */}
                                        <Button onClick={handleFavoriteMenuOpen} sx={{ ml: 1 }}>
                                            Mis favoritos
                                        </Button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={favoritesMenuOpen}
                                            onClose={handleCloseMenu}
                                        >
                                            {favoritos.map((favorito) => (
                                                <MenuItem key={favorito.id} onClick={() => navigate(`/detalle/${favorito.id}`)}>
                                                    {favorito.nombre}
                                                </MenuItem>
                                            ))}
                                            {favoritos.length === 0 && <MenuItem>No hay favoritos</MenuItem>}
                                        </Menu>
                                    </IconButton>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color='info'>Cerrar</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={state.left} onClose={() => toggleDrawer('left', false)}>
                <List sx={{ mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
                    <Button onClick={goHome} size='small' color='grey' sx={{ fontSize: '0.8rem', fontWeight: 'bold' }} ><HomeRoundedIcon sx={{ color: 'teal', mr: 2 }} />Inicio</Button>
                </List>
                <List sx={{ mt: 6, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
                    <Button onClick={goPlomeria} size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 8, fontWeight: 'bold' }}>  <WaterDropRoundedIcon sx={{ color: 'blue', mr: 2 }} />Plomería</Button>
                    <Button onClick={goGasista} size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 12, mt: 1, fontWeight: 'bold' }}>  <PropaneTankRoundedIcon sx={{ color: 'cyan', mr: 2 }} /> Gas </Button>
                    <Button onClick={goConstruccion} size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 3, mt: 1, fontWeight: 'bold' }}> <ConstructionRoundedIcon sx={{ color: 'green', mr: 2 }} />Construcción  </Button>
                    <Button size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 8, mt: 1, mb: 2, fontWeight: 'bold' }}>  <FormatPaintRoundedIcon sx={{ color: 'black', mr: 2 }} /> Pintura   </Button>
                    <Button onClick={goReparaciones} size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 2, mt: 1, fontWeight: 'bold' }}><BuildRoundedIcon sx={{ color: 'orangeRed', mr: 2 }} />  Todos   </Button>
                </List>
                <Divider />
                <List>
                    {['Contacto', 'Email'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {<ContactsRoundedIcon sx={{ color: 'lightblue' }} />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>

                        </ListItem>
                    ))}
                    <Button onClick={info} color='error' variant='contained' size='small' sx={{ ml: 6, mt: 3, maxHeight: 22 }}>info</Button>
                </List>
            </Drawer>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', mt: 2 }}>
                <SearchBar />
                <h2>
                    En esta página podrás encontrar el servicio que necesitas, ya sea reparaciones simples, como construcción de vivienda
                </h2>
            </Box>
        </Box>

    );

};

export default NavBar;

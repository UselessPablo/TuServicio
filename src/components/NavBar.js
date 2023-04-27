
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState} from 'react';
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
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';


const NavBar = () => {
    const [state, setState] = useState({ left: false });
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState("");

    const toggleDrawer = (anchor, open) => {
        setState({ ...state, [anchor]: open });
    };

    const goHome = () => {
        navigate('/');
        toggleDrawer('left', false);
        setCurrentPage('/');
    }
    const goPlomeria = () => {
        navigate('/DetalleAgua')
        toggleDrawer('left', false);
        setCurrentPage('/DetalleAgua');
    }
    const goGasista = () => {
        navigate('/Gasistas')
        toggleDrawer('left', false);
        setCurrentPage('/Gasistas');
    }
    const goReparaciones = () => {
        navigate('/Reparaciones')
        toggleDrawer('left', false);
        setCurrentPage('/Reparaciones');
    }
    const goConstruccion = () => {
        navigate('/Construccion')
        toggleDrawer('left', false);
        setCurrentPage('/Construccion');
    }

    const info = () => {
        navigate('/Info')
    }

    return (

        <Box sx={{ flexGrow: 1, padding: 1, width: '98%' }}>
            <AppBar position="sticky" elevation='0' sx={{ backgroundColor: 'secondary.main', borderTopLeftRadius: 3, borderBottomLeftRadius: 40, borderTopRightRadius: 3, borderBottomRightRadius: 40, pb: 1 }}>
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="left"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h1" fontSize='1.6rem' component="div" textAlign='center' fontWeight='bold' sx={{ flexGrow: 1 }}>
                        TuServicio
                    </Typography>
                    <Button onClick={info} color='error' variant='contained' size='small' sx={{ mr: 1 }}>info</Button>
                    <Button color="success" variant='contained' size='small'>Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={state.left} onClose={() => toggleDrawer('left', false)}>
                <List sx={{ mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
                    <Button onClick={goHome} size='small' color='grey' sx={{ fontSize: '0.8rem', fontWeight: 'bold' }} ><HomeRoundedIcon sx={{ color: 'teal', mr: 2, backgroundColor: currentPage === '/' ? '#E8F5E9' : 'transparent' }} />Inicio</Button>
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
                                    {index % 2 === 0 ? <ContactsRoundedIcon sx={{ color: 'lightblue' }} /> : <MailIcon sx={{ color: 'lightsalmon' }} />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
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

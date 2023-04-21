
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from 'react';
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

const NavBar = () => {
    const [state, setState] = useState({ left: false });

    const toggleDrawer = (anchor, open) => {
        setState({ ...state, [anchor]: open });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Servicios para el Hogar
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={state.left} onClose={() => toggleDrawer('left', false)}>
                <List sx={{mt:6}}>
                    {[
                        { text: 'Plomería', icon: <WaterDropRoundedIcon sx={{color:'blue'}} /> },
                        { text: 'Gas', icon: <PropaneTankRoundedIcon sx={{color: 'cyan' }} /> },
                        { text: 'Reparaciones', icon: <BuildRoundedIcon sx={{color:'orangeRed'}} /> },
                        { text: 'Construcción', icon: <ConstructionRoundedIcon sx={{color:'green'}} /> },
                    { text: 'Pintura', icon: <FormatPaintRoundedIcon sx={{ color: 'black' }} /> }
                    ].map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Contacto', 'Email'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <ContactsRoundedIcon sx={{color:'lightblue'}} /> : <MailIcon sx={{color:'lightsalmon'}} />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        
        <header>
                <Typography variant='h5' sx={{textAlign:'center',mt:2,mb:2}}>En esta página podrás encontrar el servicio que necesitas, ya sea reparaciones simples, como construcción de vivienda.</Typography>
        </header>
        </Box>
    );
};

export default NavBar;

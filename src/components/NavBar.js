
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
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom';
import { CardHeader } from '@mui/material';
const NavBar = () => {
    const [state, setState] = useState({ left: false });
    const navigate = useNavigate();
   
    const toggleDrawer = (anchor, open) => {
        setState({ ...state, [anchor]: open });
    };
const goHome = () => {
navigate ('/');
    toggleDrawer('left', false);
}
const goPlomeria = () =>{
    navigate('/DetalleAgua')
    toggleDrawer('left', false);
}
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: 'primary.main', padding: 1, borderRadius: 2 }}>
            <AppBar position="static" sx={{ backgroundColor: 'pop.main', borderRadius: 2 }}>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Servicios para el Hogar
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={state.left} onClose={() => toggleDrawer('left', false)}>
                <Box sx={{mt:6, display:'flex', flexDirection:'column', justifyContent:'start' , alignItems:'center'}}>
                    <Button onClick={goHome} size='small' color='grey'   sx={{ fontSize:'0.8rem', fontWeight:'bold'}} ><HomeRoundedIcon  sx={{ color: 'teal', mb: 1,mr:2 }} />Inicio</Button>       
                    <Button onClick={goPlomeria} size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 11, mt: 1 }}>  <WaterDropRoundedIcon sx={{ color: 'blue', mr: 2 }} /> Agua    </Button> 
                    <Button size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 12, mt: 1 }}>  <PropaneTankRoundedIcon sx={{ color: 'cyan', mr: 2 }} /> Gas </Button> 
                    <Button size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 3, mt: 1 }}><BuildRoundedIcon sx={{ color: 'orangeRed', mr: 2 }} />  Reparaciones   </Button> 
                    <Button size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 2, mt: 1 }}> <ConstructionRoundedIcon sx={{ color: 'green', mr: 2 }} />Construcción  </Button> 
                    <Button size='small' color='grey' sx={{ fontSize: '0.7rem', mr: 7, mt: 1, mb: 2 }}>  <FormatPaintRoundedIcon sx={{ color: 'black', mr: 2 }} /> Pintura   </Button>     
                </Box>
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
            <h2>
               En esta página podrás encontrar el servicio que necesitas, ya sea reparaciones simples, como construcción de vivienda
            </h2>
    
        </Box>
 
   );
};

export default NavBar;

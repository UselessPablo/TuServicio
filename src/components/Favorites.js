import { useEffect, useState } from 'react';
import { useFavoriteContext } from '../components/UserProvider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Badge, Box, Typography, Button, Modal, Avatar} from '@mui/material';
import { Link } from 'react-router-dom';

function Favorites() {
    const { favoritos } = useFavoriteContext();
    const [favorites, setFavorites] = useState([]);
    const [open, setOpen] = useState(false)
 
    useEffect(() => {
        if (favoritos) {
            setFavorites(Object.values(favoritos));
        }
    }, [favoritos]);
   
    if (!favoritos) {
        return <div>Loading...</div>;
    }

const handleClose = ()=>{
    setOpen(false)
}
    const handleOpen = () => {
        setOpen(true);
    };

return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }} >
        <Button onClick={handleOpen}>
            <Badge badgeContent={favorites.length} color="red">
                <FavoriteIcon color={open ? 'success' : 'success'} />
            </Badge>
        </Button>
        <Modal
        sx={{display:'flex', justifyContent:'center', minWidth:'100%'}}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'white', width: '50%', height: '50%', p: 3 }}>
                <Typography variant="h5" component="h2" sx={{ my: 2 }}>
                    Favoritos
                </Typography>
                {favorites.length > 0 && (
                    <Box  >
                        {favorites.map((favorite) => (
                            <Box key={favorite.id} >
                                {favorite &&
                                    (
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Link className='favoritos' to={`/detalle/${favorite.id}`} onClick={()=>{handleClose && handleClose()}}>
                                            <Typography>{favorite.nombre}</Typography>
                                            <Typography sx={{margin:1, color:'black'}}>{favorite.categoria}</Typography>
                                            <Avatar variant='rounded' src={favorite.imagen} sx={{mr:1}} />
                                        </Link>
                                    </Box>
                                    )}
                            </Box>
                        ))}
                    </Box>
                )} {/* Aquí puedes renderizar el nuevo componente que deseas mostrar */}
                <Button onClick={handleClose} color='pop' size='small' variant='contained' sx={{ mt: 1 }}>Cerrar</Button>
          
            </Box>
        </Modal>
      
    </Box>
  
    );
    
}

export default Favorites;

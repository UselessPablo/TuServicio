import { useEffect, useState } from 'react';
import { useFavoriteContext } from '../components/UserProvider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Badge, Box, Typography, Button} from '@mui/material';
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
  
return (
    <Box sx={{display:'flex', justifyContent:'center'}} >
        <Button onClick={() => setOpen(!open)}>
            <Badge badgeContent={favorites.length} color="red">
                <FavoriteIcon color={open ? 'success' : 'success'} />
            </Badge>
        </Button>
        {open && favorites.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                {favorites.map((favorite) => (
                    <Box key={favorite.id} >
                        {favorite &&
                         (
                            <Link className='favoritos' to={`/detalle/${favorite.id}`}>
                                <Typography>{favorite.nombre}</Typography>
                            </Link>
                        )}
                   
                    </Box>
                ))}
                <Button onClick={handleClose} color='pop' size='small' variant='contained' sx={{mt:1}}>Cerrar</Button>
            </Box>
        )}
    </Box>
    );
    
}

export default Favorites;

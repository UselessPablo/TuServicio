import React from 'react'
import { Box, Typography, Card, CardHeader, CardActions, CardMedia, CardContent, Collapse, IconButton, IconButtonProps, styled, Avatar } from '@mui/material';
import {useState, useEffect, useContext} from 'react';
import { random } from 'lodash';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import { useFavoriteContext } from '../components/UserProvider';
import {userContext} from './UserProvider';

const Reparaciones = ({ data}) => {

    const user = useContext(userContext);
    const [datos, setDatos] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [ratings, setRatings] = useState({});
    const getRandomColor = () => `#${Math.floor(random(0, 16777215)).toString(16)}`;
    const [isFavorite, setIsFavorite] = useState({});
    const { addFavorite } = useFavoriteContext();
    useEffect(() => {
        setDatos(data);
    }, [data])

    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
    }
    const handleExpandClick = (id) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [id]: !prevExpanded[id],
        }));
    };

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));
    const handleRatingChange = (id, newValue) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [id]: newValue
        }));
    };

    console.log(data);
    return (

        <>
            <Typography textAlign='center' variant='h6' sx={{ padding: 1, borderRadius: 2, width: '180px', margin: '0 auto', mt: 2 }}>Reparaciones Varias</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 1, justifyContent: 'center' }}>
                {datos.map((dato) => (
                    <Box key={dato.id} sx={{ width: '100%', maxWidth: 200, m: 1 }}>
                        <Card sx={{ color: 'info.main' }}>
                            <CardHeader sx={{ backgroundColor: 'fondoCard.main', color: 'white' }}
                                avatar={
                                    <Avatar sx={{ bgcolor: getRandomColor(), width: 30, height: 30 }} aria-label={dato.nombre}>
                                        {dato.letra}
                                    </Avatar>
                                }
                          
                                title={dato.nombre}
                            />
                            <CardMedia component="img" height="194" image={dato.imagen} alt={dato.nombre} />
                            <CardContent sx={{ overflow: 'auto', maxHeight: '250px', backgroundColor: 'fondoDrawer.main' }}>
                                <Typography variant="body2" color="black" fontWeight='bold' textAlign='center' sx={{ mb: 1, mt: 1 }}>
                                    {dato.categoria}
                                </Typography>
                                <Collapse in={expanded[dato.id] || false} timeout="auto" unmountOnExit >
                                    <Typography paragraph>Contacto:{dato.contacto}</Typography>
                                    <Typography variant='body1' sx={{ minHeight: '120px' }} >{dato.destrezas}</Typography>
                                </Collapse>
                                <Rating
                                    name={`rating-${dato.id}`}
                                    value={ratings[dato.id] || 0}
                                    onChange={(event, newValue) => {
                                        handleRatingChange(dato.id, newValue);
                                    }}
                                />
                            </CardContent>
                            <CardActions disableSpacing sx={{ backgroundColor: 'secondary.main' }}>
                                {user && (
                                    <FavoriteIcon
                                        aria-label="add to favorites"
                                        onClick={() => {
                                            addFavorite(
                                                dato.id,
                                                dato.nombre,
                                                dato.imagen,
                                                dato.categoria
                                            );
                                            setIsFavorite((prevIsFavorite) => ({
                                                ...prevIsFavorite,
                                                [dato.id]: !prevIsFavorite[dato.id],
                                            }));
                                        }}
                                        className={isFavorite[dato.id] ? 'favorite-button-selected' : 'favorite-button'}
                                    >
                                    </FavoriteIcon>
                                )}
                                <ExpandMore
                                    expand={expanded[dato.id] || false}
                                    onClick={() => handleExpandClick(dato.id)}
                                    aria-expanded={expanded[dato.id] || false}
                                    aria-label="show more"
                                    color='fondo'
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>
        </>
    );
};
export default Reparaciones
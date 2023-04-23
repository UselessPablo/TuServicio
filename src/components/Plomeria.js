import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { teal } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Plomeria = ({ data }) => {
    const [datos, setDatos] = useState([]);
    const [expanded, setExpanded] = React.useState({});

 
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



    return (
       
        <>
            <Typography textAlign='center' variant='h4' sx={{ backgroundColor: 'info2.main', padding: 1, borderRadius: 2, width: '220px', margin: '0 auto', mt:2 }}> Plomería</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 1 }}>
                {datos.map((dato) => (
                    <Box key={dato.id} sx={{ width: '100%', maxWidth: 240, m: 1 }}>
                        <Card>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: teal[300] }} aria-label={dato.nombre}>
                                    {dato.letra}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={dato.nombre}
                        />

                        <CardMedia component="img" height="194" image={dato.imagen} alt={dato.nombre} />

                        <CardContent sx={{ overflow: 'auto', maxHeight:'250px' }}>
                            <Typography variant="body2" color="black" fontWeight='bold' textAlign='center' sx={{mb:1,mt:1}}>
                                {dato.categoria}
                            </Typography>
                            <Collapse in={expanded[dato.id] || false} timeout="auto" unmountOnExit >
                                <Typography paragraph>Contacto:{dato.contacto}</Typography>
                                    <Typography variant='body1' sx={{minHeight:'120px'}} >{dato.destrezas}</Typography>         
                            </Collapse>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expanded[dato.id] || false}
                                onClick={() => handleExpandClick(dato.id)}
                                aria-expanded={expanded[dato.id] || false}
                                aria-label="show more"
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

export default Plomeria;


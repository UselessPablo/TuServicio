import React, { Component} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Rating, Card, CardContent, CardMedia, Avatar } from '@mui/material';

class Carrousel extends Component {
 
    render() {
        const { data } = this.props; // obtiene la data desde la prop
     
        const settings = {
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 1800,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '30px',
        };
        return (
         
            <Box>
              
                <Slider {...settings}>
                    {data && data.map((item) => (
                        <Box key={item.id}>
                            <Card sx={{maxWidth:'140px', height:'140px', borderRadius:5}}>
                            <CardMedia >
                             <Avatar className='imgCenter' src={item.imagen} alt={item.nombre} />
                            <Typography textAlign='center' >{item.nombre}</Typography>
                                </CardMedia>
                                <CardContent>
                            <Rating value={item.calificacion}></Rating>
                            <Typography textAlign='center'>{item.categoria}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Slider>
            </Box>
           
        );
    }
}

export default Carrousel;

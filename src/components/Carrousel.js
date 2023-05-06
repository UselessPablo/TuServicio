import React, { Component} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Rating } from '@mui/material';

class Carrousel extends Component {
 
    render() {
        const { data } = this.props; // obtiene la data desde la prop
     
        const settings = {
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 1000,
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
                            <img className='imgCenter' src={item.imagen} alt={item.nombre} />
                            <Typography textAlign='start' >{item.nombre}</Typography>
                            <Rating value={item.calificacion}></Rating>
                            <Typography textAlign='start' sx={{ml:2}} >{item.categoria}</Typography>
                        </Box>
                    ))}
                </Slider>
            </Box>
           
        );
    }
}

export default Carrousel;

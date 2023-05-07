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
            speed: 600,
            autoplay: true,
            autoplaySpeed: 1800,
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '-160px',
        };
        return (
         
            <Box sx={{width:'100vw', mt:4}}>
              
                <Slider {...settings}>
                    {data && data.map((item) => (
                        <Box key={item.id}>
                            <Card sx={{color:'white', minWidth:'140px', maxWidth:'170px', height:'220px', borderRadius:2, mr:4, ml:4, backgroundColor:'eliminar.main'}}>
                            <CardMedia sx={{display:'flex', justifyContent:'center', mt:2,mb:2}} >
                             <Avatar variant='rounded' sx={{width:'50px' , backgroundColor:'info2.main', display:'flex',justifyContent:'center' }}  className='imgCenter' src={item.imagen} alt={item.nombre} />
                                </CardMedia>
                            <Typography textAlign='center'sx={{mt:1}} >{item.nombre}</Typography>
                                
                                <CardContent sx={{mt:5, display:'flex', justifyContent:'center'}}>
                            <Rating value={item.calificacion}></Rating>
                                </CardContent>
                            <Typography textAlign='center' sx={{mb:1}}>{item.categoria}</Typography>
                               
                            </Card>
                        </Box>
                    ))}
                </Slider>
            </Box>
           
        );
    }
}

export default Carrousel;

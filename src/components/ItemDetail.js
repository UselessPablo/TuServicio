import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const ItemDetail = ({ data }) => {
   



    return (
        <Box>
            <Card sx={{ maxWidth: 255 }}>
                <CardMedia
                    sx={{ height: 170 }}
                    image={data.imagen}
                    title={data.categoria}
                />
                <CardContent sx={{height:200}}>
                    <Typography gutterBottom variant="h5" component="div">
                       {data.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.destrezas}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
               
         
        </Box>
    );
};

export default ItemDetail;

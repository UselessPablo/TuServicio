import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';


const ItemDetail = ({ data }) => {
   



    return (
       <Grid container sparcing={1} sx={{mt:4,ml:2}}>
            <Grid xs={4} sx={{display:'flex', justifyContent:'center', alignContent:'center'}}>
       <Box>
                    <Card sx={{ maxWidth: 255, backgroundColor: 'primary.main' }}>
                <CardMedia
                    sx={{ height: 170 }}
                    image={data.imagen}
                    title={data.categoria}
                />
                <CardContent sx={{}}>
                    <Typography gutterBottom variant="h5" component="div">
                       {data.nombre}
                    </Typography>
    
                </CardContent>
                <CardActions>
                    <Button size="small" variant='contained'><ShareIcon/></Button>
                            <Button size="small" variant='contained'>contactar</Button>
                </CardActions>
            </Card>
                 
        </Box>
       </Grid>
            <Grid  xs={8} >
             <Box  sx={{display:'flex', justifyContent:'center',flexDirection:'column', alignContent:'center', width:'98%'}}>
                <Typography variant='h6' textAlign='center'  sx={{width:'100%'}}>  Detalles y habilidades</Typography>
                <Typography sx={{ pt:4,mt:5, textAlign:'start',width:'50%',ml:5}}>
                    {data.destrezas}
                </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ItemDetail;

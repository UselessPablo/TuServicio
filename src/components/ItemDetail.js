import { Box, CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';


const ItemDetail = ({ data }) => {

    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
            <Box>
                <Card sx={{ maxWidth: 185, backgroundColor: 'fondo.main', ml: 2, color: 'white' }}
                title={data.categoria}
                >
                <CardHeader sx={{textAlign:'center'}}
                title={data.categoria}>
                </CardHeader>
                    <CardMedia
                        sx={{ height: 160 }}
                        image={data.imagen}
                        title={data.categoria}
                    />
                    <CardContent sx={{}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.nombre}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ backgroundColor: 'secondary.main' }}>
                        <Button size="small" variant='contained'><ShareIcon /></Button>
                        <Button size="small" variant='contained'>contactar</Button>
                    </CardActions>
                </Card>
            </Box>
            <Box sx={{ ml: 2 }}>
                <Typography variant='h6' textAlign='center' marginBottom='80px'>  Detalles y habilidades</Typography>
                <Typography sx={{ pt: 4, mt: 5, textAlign: 'center' }}>
                    {data.destrezas}
                </Typography>
            </Box>
        </Box>
    );
};

export default ItemDetail;

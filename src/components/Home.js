import React from 'react'

import { Grid, Box, Button, Typography } from '@mui/material'
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import PropaneTankRoundedIcon from '@mui/icons-material/PropaneTankRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import FormatPaintRoundedIcon from '@mui/icons-material/FormatPaintRounded';
import { useNavigate } from 'react-router-dom';
import DetalleBest from '../components/DetalleBest';
import Carrousel from '../components/Carrousel';


const Home = () => {

  const navigate = useNavigate();

  const goToAgua = () => {
    navigate('/DetalleAgua')
  }
  const goGasista = () => {
    navigate('/Gasistas')
  }
  const goConstruccion = () => {
    navigate('/Construccion')
  }
  const goPintura = ()=>{
    navigate('/Pintura')
  }
  return (
    <>
      
<DetalleBest/>
   
   
   <Carrousel/>
      <Grid container spacing={3} sx={{ pr: 3, pl: 3, mt: 4 }}>
        <Grid item xs={6}  >
          <Box sx={{ backgroundColor: 'blue', height: 200, mt: 1, display: "flex", justifyContent: "center", alignItems: 'center', borderRadius: 4 }}>
            <Button onClick={goToAgua}>
              <span title='Plomería' >
                <WaterDropRoundedIcon sx={{ width: "70%", height: "80%", color: 'white' }} />
              </span>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: 'green', height: 200, mt: 1, display: "flex", justifyContent: "center", alignItems: 'center', borderRadius: 4 }}>
            <Button onClick={goConstruccion}>
              <span title='Construcción'>
                <ConstructionRoundedIcon sx={{ width: "70%", height: "80%", color: 'white' }} />
              </span>
            </Button>
          </Box>

        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: 'red.main', height: 200, mb: 1, display: "flex", justifyContent: "center", alignItems: 'center', borderRadius: 4 }}>
            <Button onClick={goGasista}>
              <span title='Gasistas' >
                <PropaneTankRoundedIcon sx={{ width: "70%", height: "80%", color: 'white' }} />
              </span>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: 'secondary.main', height: 200, mb: 1, display: "flex", justifyContent: "center", alignItems: 'center', borderRadius: 4 }}>  <BuildRoundedIcon sx={{ width: "70%", height: "80%", color: 'white' }} /> </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ backgroundColor: 'orange', height: 120, mb: 4, display: "flex", justifyContent: "center", alignItems: 'center', borderRadius: 4 }}>  
        <Button onClick={goPintura}>
         <span title='Pintores'>
              <FormatPaintRoundedIcon sx={{ width: "40%", height: "30%", color: 'white', pt:3, pb:2 }} />
         </span>
          </Button>
          </Box>
        </Grid>

      </Grid>
    
    </>
  )
}

export default Home
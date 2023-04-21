import React from 'react'
import NavBar from './NavBar'
import { Grid,Box } from '@mui/material'
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import PropaneTankRoundedIcon from '@mui/icons-material/PropaneTankRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import FormatPaintRoundedIcon from '@mui/icons-material/FormatPaintRounded';

const Home = () => {
  return (
    <> 
    <NavBar/>
      <Grid container spacing={1} sx={{pr:1,pl:1}}>
      <Grid item xs={4}  >
          <Box sx={{ backgroundColor: 'blue', height: 240, mt: 1, display: "flex", justifyContent: "center", alignItems: 'center' }}><WaterDropRoundedIcon sx={{ width: "80%", height: "80%", color: 'white' }} /></Box>
      </Grid>
        <Grid item xs={8}>
          <Box sx={{ backgroundColor: 'green', height: 240, mt: 1, display: "flex", justifyContent: "center", alignItems: 'center' }}>
            <ConstructionRoundedIcon sx={{ width: "80%", height: "80%", color: 'white' }} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: 'red', height: 240, mb: 1, display: "flex", justifyContent: "center", alignItems: 'center' }}>  <PropaneTankRoundedIcon sx={{ width: "80%", height: "80%", color: 'white' }} /> </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: 'yellow', height: 240, mb: 1, display: "flex", justifyContent: "center", alignItems: 'center' }}>  <BuildRoundedIcon sx={{ width: "80%", height: "80%", color: 'white' }} /> </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ backgroundColor: 'orange', height: 120, mb: 1, display: "flex", justifyContent: "center", alignItems: 'center' }}>  <FormatPaintRoundedIcon sx={{ width: "80%", height: "80%", color: 'white' }} /> </Box>
        </Grid>
  
    </Grid>
    </>
  )
}

export default Home
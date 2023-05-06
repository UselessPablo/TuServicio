import React from 'react'
import { Box, Typography } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'space-evenly', alignItems:'center',  mt:15}}>
  <Box>
              <Box>
                  <a className='whats' href='https://wa.me/+5492944895986' target='_blank' rel="noreferrer" >
                      <WhatsAppIcon sx={{ width: '50px', height: '50px' }}  />
                   contacto
                  </a>
              </Box>
          </Box>
   <Box>
        <Typography> Copyright @PabloA</Typography>     
   </Box>
    </Box>
  )
}

export default Footer
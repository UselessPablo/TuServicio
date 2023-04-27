import React from 'react'
import { Box,Input,Button, Typography } from '@mui/material'
import { useState } from 'react'
const Register = () => {
 
 const [isRegister, setIsRegister]= useState('')
 
    return (
    
    
    
    <Box sx={{display:'flex', justifyContent:'start', flexDirection:'column', width:'200px',ml:10,mt:5, alignContent:'center'}}>
         <form>
          <Input placeholder='Usuario' variant='filled' />
          <Input placeholder='Contraseña'/>
            <Button variant='contained' size='small' sx={{mt:1,mb:2}}>Enviar</Button>
          </form>
          <Typography> Ya estas Registrado ?<Button  color='info' size='small' fontWeight='bold'> Login</Button></Typography> 



    </Box>
  )
}

export default Register
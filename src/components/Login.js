import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  db   from '../utils/Firebase';
import { Input, Box, Button } from '@mui/material';




const auth = getAuth(db)

const Login = ({ name }) => {
    console.log({ name });
    const navigate = useNavigate();
    //state for login error
    const [error, setError] = useState('');

    //state for mail
    const [email, setMail] = useState('')

    //state of mail for forget password

    //login handler
    const handleLogin = (e) => {
        e.preventDefault();
        let form = e.target;
        let email = form.email.value
        let password = form.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                form.reset();
                alert('Login Successful')
                goTo()
                setError('')
            })
            .catch(error => {
                console.error(error)
                setError(error.message)
            })

    }
    //handle email
    const emailHandler = (e) => {
        let mail = e.target.value
        setMail(mail)
    }

    const handlerForgetPassword = () => {
        sendPasswordResetEmail(auth, email)
          .then(() => {

            alert('Your password set link send to your mail');
          })
      }

    const goTo = () => {

        navigate('/Home', name = { name })
    }
    return (
        <Box sx={{ml:6, mt:3, display:'flex',flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
            <form  onSubmit={handleLogin}>
                <h3 >Ingresa tu usuario y contraseña {name}</h3>
                <Box >  
                    <Input onBlur={emailHandler} type="email" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
                </Box>
                <Box >
                    <Input type="password" name='password'  id="exampleInputPassword1" />
                </Box>
                <p><small className='red'>{error}</small></p>
                <Button sx={{ ml: 15, mt: 1, mb: 2 }} type="submit" variant='contained' color='info' size='small'>Enviar</Button>
                <p><small>No tienes cuenta? Crea una... <Link to={'/Register'}>REGISTRARSE</Link></small></p>
                <p><small>Olvidaste tu contraseña </small><Button sx={{ml:1}} variant='outlined' color='warning' size='small' onClick={handlerForgetPassword}>Restablecer</Button></p>

            </form>
        </Box>
    );
};
export default Login
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../utils/Firebase'
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { Input, Button, Box } from '@mui/material';


const auth = getAuth(app);

const Register = () => {
    const navigate = useNavigate();//state for error
    const [error, setError] = useState('');


    //state for success
    const [success, setSuccess] = useState('')
    const [form, setForm] = useState(true);
    //handler for submit registration form
    const [name, setName] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
        let form = e.target;
        let name = form.name.value

        let email = form.email.value
        let password = form.password.value

        // console.log(name, email, password);

        //handle regular expression for password
        if (!/(?=.*[0-9])/.test(password)) {

            setError('Please use atleast a digit..');
            return;
        }

        if (!/(?=.*[!@#$%^&*])/.test(password)) {

            setError('Please use atleast a special character(@,#,$,%,^,&,*,)')
            return;
        }

        if (password.length < 8) {

            setError('Please use password length atleast 8')
            return;
        }

        setError('')
        setName(name);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess('Registration successful...');
                form.reset();
                mailVarification();
                clear()
            })
            .catch(err => {

                console.log(err)
                setError('This username is already Exist! try another one')
            })
    }

    //email varification
    const mailVarification = () => {

        sendEmailVerification(auth.currentUser)
            .then(() => {

                alert('Perfecto, Ya Puedes Loguearte Para Ingresar')
            })
            .catch(error => {

                console.error(error)
            })

    }

    const clear = () => {
        setForm(false);
        console.log('dd');
    }
    // const goTo = () => {
    //     navigate('../pages/home')

    // }
    return (

        <Box sx={{ml:6,mt:2}}>
            <form onSubmit={submitHandler} >
                <h3 >Completa los datos para Registrarte</h3>
                <Box >  
                    <Input type="text" name='name' id="formGroupExampleInput" placeholder="Nombre y Apellido" />
                </Box>
                <Box>  
                    <Input type="email" name='email' id="formGroupExampleInput2" placeholder="Email" required />
                </Box>
                <Box >
                    <Input type="password" name='password'id="formGroupExampleInput3" placeholder="Password" required />
                    <p><small >{error}</small></p>
                    <p><small >{success}</small></p>
                </Box>
                <Button type="submit" variant='contained' size='small' color='info'sx={{ml:15,mt:1,mb:2}} >Enviar</Button>
                <p><small>Ya tienes cuenta? <Link to={'/Login'} onClick={clear}>LOGIN</Link></small></p>
            </form>

        </Box>

    );
};

export default Register;
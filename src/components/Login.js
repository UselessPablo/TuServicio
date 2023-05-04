import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Box, Button, Avatar, TextField, Typography } from '@mui/material';
import app from '../utils/Firebase'
import { storage } from '../utils/Firebase';
import { getDownloadURL, uploadBytes, ref as sRef } from '@firebase/storage';
import { updateProfile } from 'firebase/auth';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const auth = getAuth(app);
const Login = ({ setUsersmail, setAvatarnav, setNombreLog, setApellidoLog, setTelefonoLog }) => {

    const [error, setError] = useState('');
    const [email, setMail] = useState('');
    const [file, setFile] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const formRef = useRef(null);
    const [avatar, setAvatar] = useState(null);
    const [user, setUser] = useState(null);
    const [nombre, setNombre] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [apellido, setApellido] = useState(null)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                setAvatar(user.photoURL);
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        setAvatarnav(avatar)
    }, [avatar])

    useEffect(() => {
        setUsersmail(email)
    }, [email])

    useEffect(() => {
        setNombreLog(nombre)
    }, [nombre])

    useEffect(() => {
        setApellidoLog(apellido)
    }, [apellido])

    useEffect(() => {
        setTelefonoLog(telefono)
    }, [telefono])

    const handleLogin = (e) => {
        e.preventDefault();
        let email = formRef.current.email.value;
        let password = formRef.current.password.value;

        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setLoggedIn(user);
                formRef.current.reset();
                alert('Login Successful');
                setError('');
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const emailHandler = (e) => {
        let mail = e.target.value;
        setMail(mail);
    };

    // console.log(setUserAvatar);
    const handlerForgetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Your password reset link has been sent to your email');
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };
    // const setUserAvatar = useContext(UseUserContext);
    const handleUpload = () => {
        const storageRef = sRef(storage, 'usuario');
        uploadBytes(storageRef, file)
            .then((snapshot) => {
                console.log(snapshot);
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);
                    const user = auth.currentUser;
                    if (user) {
                        if (user.photoURL !== url) {
                            updateProfile(user, {
                                photoURL: url,
                            })
                                .then(() => {
                                    console.log('Profile updated successfully!');
                                    setAvatar(url);
                                    // setUserAvatar(url);                   
                                })

                                .catch((error) => {
                                    console.error(error);
                                    setError(error.message);
                                });
                        } else {
                            console.log('Photo URL is already set to', url);
                        }
                    } else {
                        console.error('No user is signed in');
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };
    const handleLogin2 = (e) => {
        e.preventDefault();
        const names = formRef.current.name.value;
        const apellidos = formRef.current.apellido.value;
        const telefonos = formRef.current.telefono.value;
        // Actualizar los estados de name, apellido y telefono
        setNombre(names);
        setApellido(apellidos);
        setTelefono(telefonos);
        // Obtener el usuario actualmente autenticado
        const user = auth.currentUser;
        // Actualizar la información del perfil del usuario con los nuevos datos
        updateProfile(user, {
            displayName: `${names} ${apellidos}`,
            phoneNumber: telefonos
        })
            .then(() => {
                console.log('Perfil de usuario actualizado');
                // Actualizar los estados de name, apellido y telefono con los valores ingresados en el formulario
                setNombre(names);
                setApellido(apellidos);
                setTelefono(telefonos);
                navigate('/')
                // Aquí puedes hacer algo como redirigir al usuario a otra página, mostrar un mensaje de éxito, etc.
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setLoggedIn(false);
                setMail('');
                setAvatar(null);
                setNombre(null);
                setApellido(null);
                setTelefono(null);
                console.log('Logout successful');
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };

    return (

        <Box sx={{ ml: 6, mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>   
            {user && avatar && (
                <Avatar src={avatar} />
            )}
            {!loggedIn && (
                <form ref={formRef} >
                    <h3 >Ingresa tu usuario y contraseña </h3>
                    <Box >
                        <TextField
                            variant='filled'
                            type="email"
                            name="email"
                            onChange={emailHandler}
                            aria-describedby="emailHelp"
                            required='true'
                            color='info'
                        />
                    </Box>    
                    <Box >
                        <TextField
                            variant='filled'
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            label="Password"
                        />

                        <IconButton sx={{mt:1, ml:1}} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Box>
                    <p><small className='red'>{error}</small></p>            
                    <Button sx={{ ml: 15, mt: 1, mb: 2 }} onClick={handleLogin} variant='contained' color='info' size='small'>Enviar</Button>
                    <p><small>No tienes cuenta? Crea una... <Link to={'/Register'}>REGISTRARSE</Link></small></p>
                    <p><small>Olvidaste tu contraseña </small><Button sx={{ ml: 1 }} variant='outlined' color='warning' size='small' onClick={handlerForgetPassword}>Restablecer</Button></p>
                    <p><small>Abandonar sesión</small>   <Button sx={{backgroundColor:'red.main', color:'white',ml:2}} variant="contained"  size='small' onClick={handleLogout}>
                        Logout
                    </Button> </p>          
                </form>
            )}
            {loggedIn && (
                <>
                    <Box sx={{}}>
                        {/* <Box sx={{ mb: 4, ml:6, }}> */}
                        <Input type="file" onChange={handleFileChange} placeholder='Seleciona una imagen de avatar' />
                        <Button onClick={handleUpload}
                            variant='contained'
                            color='info2'
                            size='small'
                            sx={{ ml: 2, mt: 2 }}
                        >cargar imagen</Button>
                    </Box>
                    <Typography textAlign='start' sx={{ mt: 4, ml: 5 }}>Completa el siguiente formulario</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
                        <form className='formDetails' ref={formRef} onSubmit={handleLogin2}>
                            <TextField placeholder='Nombre' variant='filled' name='name' type='text' onChange={(e) => {
                                setNombre(e.target.value);
                            }} />
                            <TextField placeholder='Apellido' variant='filled' name='apellido' type='text' />
                            <TextField placeholder='Teléfono' variant='filled' name='telefono' type='number' />
                            <Button variant='contained' sx={{ mt: 2, mb: 5 }} type="submit">Enviar</Button>
                        </form>
                    </Box>

                </>
            )}

        </Box>
    );
};


export default Login
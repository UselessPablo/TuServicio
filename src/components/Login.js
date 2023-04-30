import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import React, {useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Box, Button, Avatar} from '@mui/material';
import app from '../utils/Firebase'
import {  storage} from '../utils/Firebase';
import { getDownloadURL,uploadBytes, ref as sRef } from '@firebase/storage';
import { updateProfile } from 'firebase/auth';
import NavBar from '../components/NavBar'





const auth = getAuth(app);

const Login = ({ setUsersmail, setAvatarnav }) => {
   
    
    // const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setMail] = useState('');
    const [file, setFile] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const formRef = useRef(null);
    const [avatar, setAvatar] = useState(null);
    const [user, setUser]= useState(null);
   
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                setAvatar(user.photoURL);
            }
        });
        return unsubscribe;
    }, []);

    useEffect(()=>{
        setAvatarnav(avatar)
    },[avatar])

    useEffect(()=>{
    setUsersmail(email)
},[email])

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
                return (
                   
                   <Box sx={{ ml: 6, mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                        {user && avatar && (
                            <Avatar src={avatar} />
                        )}
                       
                        <form ref={formRef} >
                            <h3 >Ingresa tu usuario y contraseña </h3>
                            <Box >
                                <Input
                                    type="email"
                                    name="email" 
                                    onChange={emailHandler}
                                    aria-describedby="emailHelp"
                                />
                            </Box>
                            <Box >
                                <Input type="password" name='password' id="exampleInputPassword1" />
                            </Box>
                            <p><small className='red'>{error}</small></p>
                            <Button sx={{ ml: 15, mt: 1, mb: 2 }} onClick={handleLogin} variant='contained' color='info' size='small'>Enviar</Button>
                            <p><small>No tienes cuenta? Crea una... <Link to={'/Register'}>REGISTRARSE</Link></small></p>
                            <p><small>Olvidaste tu contraseña </small><Button sx={{ ml: 1 }} variant='outlined' color='warning' size='small' onClick={handlerForgetPassword}>Restablecer</Button></p>
                        </form>
                      
                        {loggedIn && (
                            <Box sx={{ mb: 4 }}>
                                <input type="file" onChange={handleFileChange} />
                                <button onClick={handleUpload}>Upload</button>
                            </Box>
                        )}
                        
                    </Box>
                );
            };
            
        export default Login
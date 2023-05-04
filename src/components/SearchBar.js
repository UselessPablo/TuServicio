import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState();
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(true);
    const [selectedEmpleado, setSelectedEmpleado] = useState();
    const [selectedItemValid, setSelectedItemValid] = useState(false);

    useEffect(() => {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, 'empleados');
        if (searchTerm) {
            const searchTermLowerCase = searchTerm.toLowerCase();
            const searchQuery = query(
                queryCollection,
                orderBy('categoria'),
                where('categoria', '>=', searchTerm),
                where('categoria', '<=', searchTermLowerCase + '\uf8ff')
            );

            getDocs(searchQuery).then((res) =>
                setOptions(
                    res.docs.map((productos) => ({
                        id: productos.id,
                        ...productos.data(),
                    }))
                )
            );
        } else {
            setOptions([]);
        }
    }, [searchTerm]);


    useEffect(() => {
        if (selectedItemValid) {
            navigate(`/detalle/${selectedItemId}`);
        }
    }, [selectedItemValid, selectedItemId]);

    const handleChange = (event, newValue) => {
        if (newValue) {
            setSelectedItemId(newValue.id);
            setSelectedEmpleado(newValue);
            setSelectedItemValid(true);
        }
        else {
            setSelectedItemId(null);
            setSelectedEmpleado(null);
            setSelectedItemValid(false)
        }
    };

    return (
        <>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Autocomplete
               
                    open={searchOpen}
                    onOpen={() => setSearchOpen(true)}
                    onClose={() => setSearchOpen(false)}
                    disablePortal={false}
                    noOptionsText={false}
                    options={options}
                    getOptionLabel={(option) => option.categoria}
                    renderOption={(props, option) => (
                        <li
                            {...props}
                            key={option.id}
                            onClick={() => {
                                setSelectedItemId(option.id);
                                setSelectedItemValid(true);
                                setSearchOpen(false);
                            }}
                        >
                            <Typography fontSize='0.8rem' fontWeight='bold' sx={{ mr: 1}}>{option.categoria}</Typography>
                            <img className='mini' src={option.imagen} alt='x' />
                            <Typography fontSize='0.7rem' sx={{ ml: 1 }}>{option.nombre} </Typography>
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Buscar...'
                            sx={{ width: 220, mb: 2, mt: 2, display: 'flex', justifyContent: 'center', color:'white' }}
                            color='info'
                            value={searchTerm}
                            variant='standard'
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder='Ej: gasista, plomero...'
                            InputProps={{
                                sx: {
                                    borderRadius: 1,
                                    color:'black',
                                },          
                                ...params.InputProps,
                                endAdornment: (
                                 
                                    <InputAdornment>
                                        <SearchIcon
                                            sx={{
                                                pb: 0.1,
                                                ml: 1,
                                                color: 'info2.main',
                                            }}
                                       
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    onChange={handleChange}
                />
            </Box>

        </>
    );
}

export default SearchBar;

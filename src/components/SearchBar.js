import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, query,  orderBy,where} from 'firebase/firestore';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(true);
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);

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
    
const goDetalles= ()=>{
    navigate('detalle')
}

    const handleChange = (event, newValue) => {
        if (newValue) {
            setSelectedItemId(newValue.id);
            setSelectedEmpleado(newValue);
        } else {
            setSelectedItemId(null);
            setSelectedEmpleado(null);
        }
    };
    return (
        <Box sx={{ width: 250, display: 'flex', justifyContent: 'center' }}>
            {selectedEmpleado ? (
                <Button onClick={goDetalles}>
                    <h2>{selectedEmpleado.nombre}</h2>
                    <p>{selectedEmpleado.categoria}</p>
                    {/* <img src={selectedEmpleado.img} alt={selectedEmpleado.categoria} /> */}
                </Button>
            ) : (
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
                                setSelectedEmpleado(option);
                                setSearchOpen(false);
                            }}
                        >
                            {option.categoria}
                            <img className='mini' src={option.imagen} alt='x' />
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Buscar...'
                            sx={{ width: 150, mb: 2 }}
                            color='info'
                            value={searchTerm}
                            variant='standard'
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder='Ej: gasista, plomero...'
                            InputProps={{
                                sx: {
                                    borderRadius: 1,
                                },
                                ...params.InputProps,
                                endAdornment: (
                                    <InputAdornment>
                                        <SearchIcon
                                            sx={{
                                                pb: 0.1,
                                                ml: 1,
                                                color: 'info.main',
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    onChange={handleChange}
                />
            )}
        </Box>
    );
}

export default SearchBar;

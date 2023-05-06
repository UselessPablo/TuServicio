import {Route, Routes, HashRouter} from 'react-router-dom';
import Layout from './Layout';
import Home from '../components/Home'
import DetallePlomeria from '../components/DetallePlomeria'
import Info from '../components/Info';
import Gas from '../components/Gas';
import DetalleReparaciones from '../components/DetalleReparaciones';
import DetalleConstruccion from '../components/DetalleConstruccion';
import DetallePintura from '../components/DetallePintura'
import DetalleCard from '../components/DetalleCard';
import Login from '../components/Login'
import Register from '../components/Register';
import { useState } from 'react';


const Router = () => {

const [avatar, setAvatar] = useState(null);
const [users2, setUsers2] = useState(null)
const [nombres, setNombres] = useState(null);
const [apellidos, setApellidos] = useState(null);
const [telefonos, setTelefonos] = useState(null)
 return(


    <HashRouter basename="/">
        <Routes>
         <Route path="/" element={<Layout 
         avatar={avatar} 
         user={users2}
          nombre={nombres}
           apellido={apellidos}
           telefono={telefonos}
            />}>
         <Route path="/" element={<Home/>} />
         <Route path='/DetalleAgua/' element={<DetallePlomeria/>} />
         <Route path='/Gasistas/' element={<Gas/>}/>
         <Route path='/Reparaciones' element={<DetalleReparaciones/>} />
         <Route path='/Construccion' element={<DetalleConstruccion/>}/>
         <Route path='/Pintura' element={<DetallePintura/>} />
         <Route path='/detalle/:id' element={<DetalleCard/>}/>
         <Route path='/Login' element={<Login 
         setAvatarnav={setAvatar}
          setUsersmail={setUsers2}
           setApellidoLog={setApellidos}
            setNombreLog={setNombres}
            setTelefonoLog={setTelefonos}
           />}/>
                <Route path='/Register' element={<Register />} />
         <Route path='/Info' element={<Info/>}/>
            </Route>
        </Routes>
    </HashRouter>
)
}
        export default Router
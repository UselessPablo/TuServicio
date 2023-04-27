import {Route, Routes, HashRouter} from 'react-router-dom';
import Layout from './Layout';
import Home from '../components/Home'
import DetallePlomeria from '../components/DetallePlomeria'
import Info from '../components/Info';
import Gas from '../components/Gas';
import DetalleReparaciones from '../components/DetalleReparaciones';
import DetalleConstruccion from '../components/DetalleConstruccion';
import DetalleCard from '../components/DetalleCard';
import Register from '../components/Register'

const Router = () => (

    <HashRouter basename="/">
        <Routes>
         <Route path="/" element={<Layout />}>
         <Route path="/" element={<Home/>} />
         <Route path='/DetalleAgua/' element={<DetallePlomeria/>} />
         <Route path='/Gasistas/' element={<Gas/>}/>
         <Route path='/Reparaciones' element={<DetalleReparaciones/>} />
         <Route path='/Construccion' element={<DetalleConstruccion/>}/>
         <Route path='/detalle/:id' element={<DetalleCard/>}/>
         <Route path='/Register' element={<Register/>}/>
         <Route path='/Info' element={<Info/>}/>
            </Route>
        </Routes>
    </HashRouter>
)

        export default Router
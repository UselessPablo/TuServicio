import {Route, Routes, HashRouter} from 'react-router-dom';
import Layout from './Layout';
import Home from '../components/Home'
import DetallePlomeria from '../components/DetallePlomeria'


const Router = () => (
  
    <HashRouter basename="/">
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home/>} />
         <Route path='/DetalleAgua/' element={<DetallePlomeria/>} />
            </Route>
        </Routes>
    </HashRouter>
)

        export default Router
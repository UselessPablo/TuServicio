import {Route, Routes, HashRouter} from 'react-router-dom';
import Layout from './Layout';
import Home from '../components/Home'

const Router = () => (
  
    <HashRouter basename="/">
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    </HashRouter>
)

        export default Router
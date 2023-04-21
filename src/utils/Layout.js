import { Outlet } from "react-router-dom";
import {Home} from '../components/Home'

const Layout = () => {

    return (
        <>
            
            <Outlet />
        </>
    )
}
export default Layout;
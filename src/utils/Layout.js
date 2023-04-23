import { Outlet } from "react-router-dom";
import {Home} from '../components/Home'
import NavBar from "../components/NavBar";

const Layout = () => {

    return (
        <>
            <NavBar/>  
            <Outlet />
        </>
    )
}
export default Layout;
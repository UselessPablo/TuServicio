import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";


const Layout = ({avatar}) => {
    
    return (
        <>
          
           <NavBar avatar={avatar}/>
            <Outlet />
           
        </>
    )
}
export default Layout;
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";


const Layout = ({avatar, user, nombre, apellido,telefono}) => {
   
    return (
        <>
          
           <NavBar avatar={avatar} user={user} nombre={nombre} apellido={apellido} telefono={telefono}  />
            <Outlet />
           
        </>
    )
}
export default Layout;
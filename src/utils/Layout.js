import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = ({avatar, user, nombre, apellido,telefono}) => {
   
    return (
        <>
          
           <NavBar avatar={avatar} user={user} nombre={nombre} apellido={apellido} telefono={telefono}  />
            <Outlet />
           <Footer/>
        </>
    )
}
export default Layout;
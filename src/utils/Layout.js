import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";


const Layout = ({avatar, user}) => {
   
    return (
        <>
          
           <NavBar avatar={avatar} user={user}/>
            <Outlet />
           
        </>
    )
}
export default Layout;
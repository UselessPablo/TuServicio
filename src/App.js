
import './App.css';
import { AuthProvider } from './components/Auth';
import { UserProvider } from './components/UserProvider';
import Router from './utils/Router';
import {teal, green, lime, yellow, lightGreen, grey, orange, red, cyan} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
 const theme = createTheme({
    palette: {
      primary: {
        // teal and green play nicely together.
        main: teal[100],
      },
     red: {
       // teal and green play nicely together.
       main: red[800],
     }, secondary: {
        main: yellow[400],
      },
      success: {
        main: lightGreen[700],
      },
      info: {
        main: teal[900],
      },
      info2: {
        main: teal[300],
      },
      fondo: {
        main: green[700],
      },
      eliminar:{
        main:lime[900],
      },
      pop:{
        main:orange[400],
      },
     pop2: {
       main: orange[600],
     },
     navbar: {
       main: cyan[700],
     },
 fondoDrawer: {
         main: teal[200],
       },
       fondoCard: {
        main:lightGreen[600],
       },
     grey: {
       main: grey[900],
     },
    },
  })
 
  return (
    <AuthProvider>
  <UserProvider>
     
  <ThemeProvider theme={theme}>
    
        <Router  />
     
    </ThemeProvider>
      
    </UserProvider>
     </AuthProvider>
  );
}

export default App;

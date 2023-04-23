
import './App.css';
import Router from './utils/Router';
import {teal, green, lime, yellow, lightGreen, grey, orange} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
 const theme = createTheme({
    palette: {
      primary: {
        // teal and green play nicely together.
        main: teal[100],
      },
      secondary: {
        main: yellow[400],
      },
      success: {
        main: lightGreen[700],
      },
      info: {
        main: teal[600],
      },
      info2: {
        main: teal[300],
      },
      fondo: {
        main: green[400],
      },
      eliminar:{
        main:lime[900],
      },
      pop:{
        main:orange[400],
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
    <ThemeProvider theme={theme}>
    
        <Router />
     
    </ThemeProvider>
    
  );
}

export default App;

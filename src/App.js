
import './App.css';
import Router from './utils/Router';
import {teal, green, orange, yellow, lightGreen} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
 const theme = createTheme({
    palette: {
      primary: {
        // teal and green play nicely together.
        main: teal[400],
      },
      secondary: {
        main: yellow[400],
      },
      success: {
        main: lightGreen[700],
      },
      info: {
        main: teal[500],
      },
      info2: {
        main: teal[100],
      },
      fondo: {
        main: green[400],
      },
      eliminar:{
        main:orange[600],
      },
      pop:{
        main:yellow[800],
      },
 fondoDrawer: {
         main: green[200],
       },
       fondoCard: {
        main:lightGreen[100],
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

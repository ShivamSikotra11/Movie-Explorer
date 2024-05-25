import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C39898',
    },
    secondary: {
      main: '#987070',
    },
    background: {
      default: '#F1E5D1',
      paper: '#DBB5B5',
    },
  },
  typography: {
    fontFamily: '"Reddit Mono", monospace',
  },
});

 
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
  <CssBaseline />
  <App />
</ThemeProvider>
      
    
  // </React.StrictMode>,
)



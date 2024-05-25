import React from 'react';
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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

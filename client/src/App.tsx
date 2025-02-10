import React from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

const theme = createTheme({
  typography: {
    fontFamily: 'Lato, Poppins ,Wix Madefor Display , serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider  router={router}/>
    </ThemeProvider>
  );
}

export default App;

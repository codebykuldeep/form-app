import React from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { redirect, RouterProvider, useNavigate } from 'react-router-dom';
import { router } from './Router';
import { Security } from '@okta/okta-react';
import OktaAuth, { toRelativeUrl } from '@okta/okta-auth-js';
import { oktaConfig } from './oktaConfig';

const theme = createTheme({
  typography: {
    fontFamily: 'Lato, Poppins ,Wix Madefor Display , serif',
  },
});
const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  //const navigateTo = useNavigate();
  const restoreOriginalUri = async (_oktaAuth:unknown, originalUri:unknown) => {
    redirect(toRelativeUrl((originalUri as string) || "/", window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider  router={router}/>
    </ThemeProvider>
    </Security>
  );
}

export default App;

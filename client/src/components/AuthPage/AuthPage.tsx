import { Stack } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Login from './Login';
import classes from './authpage.module.css'
import Register from './Register';

function AuthPage() {
    const {pathname} = useLocation();
  return (
    <Stack  className={classes.authpage}>
        {pathname.includes('login') && <Login/>}
        {pathname.includes('register') && <Register/>}
    </Stack>
  )
}

export default AuthPage
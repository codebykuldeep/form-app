import { Alert } from '@mui/material';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SnackState } from '../../types/dataTypes';

interface SnackbarProps{
    state:SnackState,
    handleClose:()=>void;
}

function Alertbar({state,handleClose}:SnackbarProps) {
    const {open,status,message} = state;
    const  vertical = 'top', horizontal ='center';
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal,vertical}}>
  <Alert
    onClose={handleClose}
    severity={status ? 'success' : 'error'}
    variant="filled"
    sx={{ width: '100%' }}
  >
    {message}
  </Alert>
</Snackbar>
  )
}

export default Alertbar
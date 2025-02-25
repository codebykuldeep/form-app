import React from 'react'
import { useTellerConnect } from 'teller-connect-react';
import constants from '../../../constants';
import classes from './bank-page.module.css'
import { Button } from '@mui/material';

interface TellerProps{
handleBank:(data:unknown)=>void;
}

function Teller({handleBank}:TellerProps) {
    const { open, ready } = useTellerConnect({
        applicationId: constants.TELLER_ID!,
        environment:'sandbox',
        onSuccess: (...args) => {
          console.log('running success');
          handleBank(args);
            console.log(args);
            
        },
        onExit:()=>{

        }
      });
      
      return (
        <Button variant='contained' onClick={() => open()} disabled={!ready} className={classes.teller_btn}>
          Connect a bank account
        </Button>
      );
}

export default Teller
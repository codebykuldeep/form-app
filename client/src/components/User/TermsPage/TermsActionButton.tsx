import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react';
import classes from './termspage.module.css'
import { accpetTermsRequest } from '../../../graphql/userResolvers';
import { useNavigate } from 'react-router-dom';

function TermsActionButton() {
    const navigate = useNavigate()
    const [check,setCheck] = useState<boolean >(false);
    const [error,setError] = useState(false);
    function handleChange(event:React.SyntheticEvent,checked:boolean){
        setCheck(checked);
        if(checked){
            setError(false);
        }
    }

    async function handleNext(){
        if(check){
            console.log('clicked');
            
            const response = await accpetTermsRequest();
            if(Boolean(response.status)){
                navigate('/user/kyc')
            }
        }
        else{
            setError(true);
        }
    }
  return (
   <>
    <FormGroup  className={error ? classes.checkbox : ''}>
        <FormControlLabel control={<Checkbox  />} label="Yes , I agree to the Terms of Service"  onChange={handleChange}/>
    </FormGroup>
    <Button fullWidth variant='contained' className={classes.next_btn} onClick={handleNext}>NEXT</Button>
   </>
  )
}

export default TermsActionButton
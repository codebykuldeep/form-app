import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import classes from './bank-page.module.css';
import Teller from './Teller';
import { submitForm, updateBank } from '../../../graphql/userResolvers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { userActions } from '../../../store/userSlice';
import BankDetail from './BankDetail';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function BankPage() {
  const navigate = useNavigate();
  const {user,bank} = useSelector((state:RootState)=>state.userSlice)
  const [loading,setLoading] = useState(false);
  const [submit,setSubmit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  
  const {process_step} = user!;
    if(Number(process_step) === 3){
      return <Navigate to={'/user/dashboard'}/>
    }


  async function handleData(args:unknown){
    setLoading(true);
    let user;
    if(Array.isArray(args)){
      user = args[0];
    }
    const access_token = user.accessToken;
    const user_id = user.user.id;
    const result = await updateBank({access_token,user_id});
    if(result.status){
      dispatch(userActions.setBank(result.bank));
    }
    setLoading(false);
  }
  async function handleSubmit() {
    if(!bank) return;
    setSubmit(true);
    const result = await submitForm();
    if(result.status){
      navigate('/user/dashboard');
    }
    setSubmit(false);
  }
  return (
    <Stack className={classes.container}>
      <Box className={classes.bank_form}>
        <Typography variant='h5' align='center' py={2}>Bankpage</Typography>
        <Box textAlign={'center'}>
        <Teller handleBank={handleData}/>
        </Box>
        {
          loading && (
            <Stack alignItems={'center'} py={2}>
              <CircularProgress  size={50}/>
              <Typography variant='body1'py={1}>Fetching bank details...</Typography>
            </Stack>
          )
        }
         {
          !loading && bank && (
            <BankDetail bank={bank}/>
          )
         }
         <Stack className={classes.action_btn}>
         <Link to={'/user/kyc'}><Button variant='contained'>Back</Button></Link>
         <Button variant='contained' onClick={handleSubmit} loading={submit} loadingPosition='end'>Submit</Button>
         </Stack>
      </Box>
     
    </Stack>
  )
}

export default BankPage
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './authpage.module.css'
import InputField from './InputField';
import { FormStateType } from '../../types/formTypes';
import { Link, useNavigate } from 'react-router-dom';
import { checkValidFormState, populateFormState } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { LoginUser } from '../../store/userSlice';
import { FormHelperText } from '@mui/material';
import GoogleProvider from './AuthProvider/GoogleProvider';
import { getToken } from '../../utils/auth-utils';
import OktaProvider from './AuthProvider/OktaProvider/OktaProvider';


export default function Login() {
    const navigate = useNavigate();
    const [formState,setFormState] = useState<FormStateType>(initialformState);
    const dispatch = useDispatch<AppDispatch>();
    const {user,loading,error} = useSelector((state:RootState)=>state.userSlice)

    useEffect(()=>{
      if(user && getToken()){
        navigate('/user');
      }
    },[user,navigate])


    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        const name = event.target.name;
        const value = event.target.value;
        setFormState((prev)=>({
          ...prev,
          [name]:{
            message:'',
            status:false,
            value:value
          }
        }))  
      }

      function handleSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        
        if(checkValidFormState(formState)){
          
          const email = formState.email.value;
          const password = formState.password.value;
          
          dispatch(LoginUser({email,password}))
        }
        else{
          setFormState(populateFormState(formState));
        }
      }
      
      
  return (
    <Card sx={{ minWidth: 400 ,minHeight:560 }} className={classes.card}>
    
      <CardContent className={classes.card_content}>
        <Typography variant="h5" component="h3" className={classes.header}>
          Login into Account
        </Typography>
        <Box className={classes.form_box}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <InputField name='email' label='Email' type='text'  formState={formState} onChange={handleChange}>Email</InputField>
                <InputField name='password' label='Password' type='password'  formState={formState} onChange={handleChange}>Password</InputField>
                {
                  error && (
                    <FormHelperText error className={classes.error_text}>{error}</FormHelperText>
                  )
                }
                <Box>
                    <Button variant='contained' type='submit' loading={loading} loadingPosition='end'>Sign In</Button>
                </Box>
            </form>
            <Box>
                <Typography variant='subtitle1'>or login with</Typography>
                <Box className={classes.auth_button}>
                    <GoogleProvider/>
                </Box>
            </Box>
            <Box className={classes.auth_switch}>
                <Link to={'/register'}><button>Register new account</button></Link>
            </Box>
        </Box>
      </CardContent>
    </Card>
  );
}



const initialformState={
    email:{
        value:'',
        status:false,
        message:''
    },
    password:{
        value:'',
        status:false,
        message:''
    },
}

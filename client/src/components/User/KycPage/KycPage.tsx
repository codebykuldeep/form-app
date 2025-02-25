import { Box, Button, Card, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import classes from './kyc.module.css';
import PersonalDetail from './PersonalDetail';
import AddDetails from './AddDetails';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validation';
import { FormStateType } from '../../../types/formTypes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { userActions, VerifyUser } from '../../../store/userSlice';
import { updateKYC } from '../../../graphql/userResolvers';
import { useNavigate } from 'react-router-dom';

interface props{
  initialFormstate:FormStateType;
}

function KycPage({initialFormstate}:props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formState, setFormState] = useState<FormStateType>(initialFormstate);

  useEffect(()=>{
    dispatch(userActions.changeKycForm(formState));
  },[formState,dispatch])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;
        const [message, status] = validation(name, value);
        let newState:FormStateType;
        setFormState((prev) => {
          newState= {
            ...prev,
            [name]: {
              message: message,
              status: status,
              value: value,
            },
          }
          return newState;
        });
      }
      async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
          event.preventDefault();
      
          if (checkValidFormState(formState)) {
            const data =await updateKYC(formState);
            console.log(data);
            if(Boolean(data.status)){
              dispatch(VerifyUser());
              navigate('/user/bank-detail')
            }
          } else {
            setFormState(populateFormState(formState));
          }
        }
  return (
    <Stack className={classes.container}>
      <Card sx={{minWidth:500,p:4}}>
        <Typography variant='h6' textAlign={'center'} p={2}>KYC Form</Typography>
        <form onSubmit={handleSubmit}>
          <Box className={classes.detail_form}>
            <PersonalDetail formState={formState} onChange={handleChange}/>
            <AddDetails formState={formState} onChange={handleChange}/>
          </Box>
          <Box className={classes.next_btn}>
            <Button variant='contained' type='submit'>NEXT</Button>
          </Box>
        </form>
      </Card>
    </Stack>
  )
}

export default KycPage



export const initialKycformState = {
  first_name: {
    value: "",
    status: false,
    message: "",
  },
  last_name: {
    value: "",
    status: false,
    message: "",
  },
  contact: {
    value: "",
    status: false,
    message: "",
  },
  dob: {
    value: "",
    status: false,
    message: "",
  },

  address: {
    value: "",
    status: false,
    message: "",
  },
  occupation: {
    value: "",
    status: false,
    message: "",
  },
  document_id: {
    value: "",
    status: false,
    message: "",
  },
};

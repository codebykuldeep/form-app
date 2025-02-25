import { Box } from '@mui/material'
import React from 'react'
import { FormStateType } from '../../../types/formTypes';
import InputField from '../InputField';

interface Props{
    formState:FormStateType,
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

function PersonalDetail({formState,onChange}:Props) {
    
  return (
    <Box>
        <Box>PersonalDetail</Box>
        <InputField formState={formState} name='first_name' label='First Name' type='text' onChange={onChange}>First Name</InputField>
        <InputField formState={formState} name='last_name' label='Last Name' type='text' onChange={onChange}>Last Name</InputField>
        <InputField formState={formState} name='dob' label='Date of birth' type='date' onChange={onChange}>Date of Birth</InputField>
        <InputField formState={formState} name='contact' label='Phone Number' type='number' onChange={onChange}>Phone Number</InputField>
    </Box>
  )
}

export default PersonalDetail


import { Box } from '@mui/material';
import React from 'react'
import InputField from '../InputField';
import { FormStateType } from '../../../types/formTypes';

interface Props{
    formState:FormStateType,
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

function AddDetails({formState,onChange}:Props) {
    
  return (
    <Box>
        <Box>Additional Details</Box>
        <InputField formState={formState} name='address' label='Address' type='text' onChange={onChange}>Address</InputField>
        <InputField formState={formState} name='occupation' label='Occupation' type='text' onChange={onChange}>Occupation</InputField>
        <InputField formState={formState} name='document_id' label='Document Id' type='text' onChange={onChange}>Document Id</InputField>
    </Box>
  )
}

export default AddDetails



  
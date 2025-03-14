import { TextField, Box, FormLabel } from '@mui/material'
import React from 'react'
import { FormStateType } from '../../types/formTypes';


interface InputFieldProps{
    name:string;
    label:string;
    type:string;
    formState:FormStateType,
    children:string;
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

function InputField({label,type,name,children,formState,onChange}:InputFieldProps) {
  return (
    <Box >
      <FormLabel htmlFor={name} error={formState[name].status}>{label}</FormLabel>
      <TextField
          fullWidth
          size='small'
          placeholder={children}
          id={name}
          name={name}
          type={type}
          
          
          defaultValue={formState[name].value}
          error={formState[name].status}
          helperText={formState[name].message}
          onChange={onChange}
        />
    </Box>
  )
}

export default InputField
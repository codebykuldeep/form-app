import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import classes from "./authpage.module.css";
import InputField from "./InputField";
import { FormStateType } from "../../types/formTypes";
import { Link } from "react-router-dom";
import {
  checkValidFormState,
  populateFormState,
  validation,
} from "../../utils/validation";
import { useMutation } from "@apollo/client";
import { REGISTER_QUERY } from "../../graphql/authQueries";
import Alertbar from "../UI/Alertbar";
import { SnackState } from "../../types/dataTypes";
import { RegisterResponse } from "../../types/FetchResults";

export default function Register() {
  const [formState, setFormState] = useState<FormStateType>(initialformState);
  const [registerFn,{data,loading}] = useMutation(REGISTER_QUERY)
  const [snackState,setSnackState] = useState<SnackState>({open:false,status:false,message:''});

  useEffect(()=>{
    if(data){
      const {register} = data as RegisterResponse;
      const {status,message} = register;
      if(Boolean(status)){
        setSnackState({open:true,status:Boolean(status),message})
      }
      else{
        setSnackState({open:true,status:Boolean(status),message})
      }
    }
  },[data])

  const handleClose = ()=>setSnackState(prev=>({...prev,open:false}));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    const [message, status] = validation(name, value);
    setFormState((prev) => ({
      ...prev,
      [name]: {
        message: message,
        status: status,
        value: value,
      },
    }));
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (checkValidFormState(formState)) {
      const email = formState.email.value;
      const password = formState.password.value;;
      const first_name = formState.first_name.value;
      const last_name = formState.last_name.value;
      const dob = formState.dob.value;
      console.log(email,password,first_name,last_name,dob);
      registerFn({variables:{email,password,dob,firstName:first_name,lastName:last_name}});
      alert("register");
    } else {
      setFormState(populateFormState(formState));
    }
  }
  console.log(data);
  
  return (
    <>
    <Card sx={{ minWidth: 400, minHeight: 560 }} className={classes.card}>
      <CardContent className={classes.card_content}>
        <Typography variant="h5" component="h3" className={classes.header}>
          Register yourself
        </Typography>
        <Box className={classes.form_box}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <InputField
              name="email"
              label="Email"
              type="text"
              formState={formState}
              onChange={handleChange}
            >
              Email
            </InputField>
            <InputField
              name="first_name"
              label="First Name"
              type="text"
              formState={formState}
              onChange={handleChange}
            >
              First Name
            </InputField>
            <InputField
              name="last_name"
              label="Last Name"
              type="text"
              formState={formState}
              onChange={handleChange}
            >
              Last Name
            </InputField>
            <InputField
              name="dob"
              label="Date of birth"
              type="date"
              formState={formState}
              onChange={handleChange}
            >
              Date Of Birth
            </InputField>

            <InputField
              name="password"
              label="Password"
              type="password"
              formState={formState}
              onChange={handleChange}
            >
              Password
            </InputField>
            <Box>
              <Button variant="contained" type="submit" loading={loading} loadingPosition="end">
                Sign Up
              </Button>
            </Box>
          </form>
          <Box className={classes.auth_switch}>
            <Link to={"/login"}>
              <button>Login here</button>
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
    <Alertbar state={snackState} handleClose={handleClose}/>
    </>
  );
}

const initialformState = {
  email: {
    value: "",
    status: false,
    message: "",
  },
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
  dob: {
    value: "",
    status: false,
    message: "",
  },
  password: {
    value: "",
    status: false,
    message: "",
  },
};

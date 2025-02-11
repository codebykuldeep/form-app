import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { verifyEmailToken } from '../../graphql/queryResolvers';
import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import classes from './verify-email.module.css'

function VerifyEmail() {
  const [loading,setLoading] = useState(true);
  const [query] = useSearchParams();
  const code = query.get('v');
  const [message,setMessage] = useState('');
  const [status,setStatus] = useState(false);

  useEffect(()=>{
    if(code){
      verifyEmailToken(code).then(res=>{
        if(Boolean(res.status)){
          setStatus(Boolean(res.status));
          setMessage(res.message);
        }
        else{
          setMessage(res.message);
        }
        setLoading(false)
      })
    }
  },[code])
  return (
    <Stack className={classes.container}>
      <Card sx={{ minWidth: 275 ,minHeight:150 }}>
      <CardContent className={classes.card}>
        <Typography variant='h6'>Email verification</Typography>
      {loading && <p>Verifying your email</p>}
      {!loading && message && <p>{message}</p>}
      </CardContent>
      {
        status && (
        <CardActions className={classes.card_btn} >
          <Link to={'/login'}><Button size="small">Go to Login page</Button></Link>
        </CardActions>
        )
      }
    </Card>
    </Stack>
  )
}

export default VerifyEmail
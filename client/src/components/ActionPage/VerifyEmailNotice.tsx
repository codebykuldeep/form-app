import React from 'react'
import classes from './verify-email.module.css'
import { Card, CardContent, Stack, Typography } from '@mui/material'

function VerifyEmailNotice() {
  return (
    <Stack className={classes.container}>
      <Card sx={{ minWidth: 275 ,minHeight:150 }}>
      <CardContent className={classes.card}>
        <Typography variant='h6'>Email Not Verified</Typography>
        <Typography variant='body1'>Please check your email for verification Link</Typography>
      </CardContent>
    </Card>
    </Stack>
  )
}

export default VerifyEmailNotice
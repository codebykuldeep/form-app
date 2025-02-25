import React from 'react'
import TermsContent from './TermsContent'
import { Card, Stack } from '@mui/material'
import classes from './termspage.module.css'
import TermsActionButton from './TermsActionButton'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

function TermsPage() {
  const user = useSelector((state:RootState)=>state.userSlice.user);
  const {process_step} = user!;
    if(Number(process_step) === 3){
      return <Navigate to={'/user/dashboard'}/>
    }
  return (
    <Stack className={classes.container}>
      <Card sx={{maxWidth:500,p:4}}>
      <TermsContent/>
      <TermsActionButton/>
      </Card>
    </Stack>
  )
}

export default TermsPage
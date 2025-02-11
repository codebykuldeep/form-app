import React from 'react'
import TermsContent from './TermsContent'
import { Card, Stack } from '@mui/material'
import classes from './termspage.module.css'
import TermsActionButton from './TermsActionButton'

function TermsPage() {
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
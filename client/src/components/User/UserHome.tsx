import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Navigate } from 'react-router-dom';

function UserHome() {
  const user = useSelector((state:RootState)=>state.userSlice.user);
  
  const {process_step} = user!;

  if(Number(process_step) === 0){
    
    return <Navigate to={'terms'}/>
  }
  else if(Number(process_step) === 1){
    
    return <Navigate to={'kyc'}/>
  }
  else if(Number(process_step) === 2){
    return <Navigate to={'bank-detail'}/>
  }
  
  return (
    <Navigate to={'dashboard'}/>
  )
}

export default UserHome
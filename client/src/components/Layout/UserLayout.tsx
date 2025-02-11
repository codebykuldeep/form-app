import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import VerifyEmailNotice from '../ActionPage/VerifyEmailNotice'


function UserLayout() {
    const user = useSelector((state:RootState)=>state.userSlice.user)
    
    if(!user){
      return <Navigate to={'/login'}></Navigate>
    }
    
    if(!Boolean(user?.email_verified)){
        return <VerifyEmailNotice/>
    }

    
  return (
    <Outlet/>
  )
}

export default UserLayout
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Outlet } from 'react-router-dom'
import VerifyEmail from '../User/VerifyEmail'

function UserLayout() {
    const user = useSelector((state:RootState)=>state.userSlice.user)
    if(!Boolean(user?.email_verified)){
        return <VerifyEmail/>
    }
  return (
    <Outlet/>
  )
}

export default UserLayout
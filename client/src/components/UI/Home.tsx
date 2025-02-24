import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Navigate } from 'react-router-dom';
import { getToken } from '../../utils/auth-utils';

function Home() {
    const user = useSelector((state:RootState)=>state.userSlice.user);
    if(user &&  getToken()){
      return <Navigate to={'/user'}/>
    }
    else{
      return <Navigate to={'/login'}/>
    }
}

export default Home
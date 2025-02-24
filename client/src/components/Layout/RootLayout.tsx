import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getToken, removeToken, setToken } from '../../utils/auth-utils';
import { authenticateUser } from '../../graphql/queryResolvers';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/userSlice';

function RootLayout() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    if(getToken()){
      const token = String(getToken());
      authenticateUser(token).then((data)=>{
        if(Boolean(data.status)){
          console.log('root',data);
          
          dispatch(userActions.setState({user:data.user,kyc:data.kyc,bank:data.bank}));
          setToken(data.token);
        }
        else{
          removeToken();
        }
        setLoading(false);
      })
      .catch(()=>{
        removeToken();
        setLoading(false);
      })
    }
    else{
      setLoading(false)
    }
  },[dispatch])

  if(loading){
    return <p>Loading...</p>
  }
  return (
    <Outlet/>
  )
}

export default RootLayout
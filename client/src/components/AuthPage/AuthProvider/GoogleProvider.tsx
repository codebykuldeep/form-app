import React from 'react';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import constants from '../../../constants';
import { authenticateGoogleAuth } from '../../../graphql/queryResolvers';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { userActions } from '../../../store/userSlice';
import { setToken } from '../../../utils/auth-utils';

const GoogleProvider = () => {
    const dispatch = useDispatch<AppDispatch>();
 const clientId = String(constants.CLIENT_ID);
 async function handleGoogleLogin(credentialResponse: CredentialResponse){
    const { credential,clientId} = credentialResponse;
    const data = await authenticateGoogleAuth(credential!,clientId!);
    if(Boolean(data.status)){
        dispatch(userActions.setUser(data.user));
        setToken(data.token);
    }
    else{
        console.log(data);
        
        alert('failed')
    }
 }
  return (
   <GoogleOAuthProvider clientId={clientId}>
     <GoogleLogin
       onSuccess={credentialResponse => {
         handleGoogleLogin(credentialResponse)
       }}
       onError={() => {
         console.log('Login Failed');
       }}
     />
   </GoogleOAuthProvider>
   );
 };


 export default GoogleProvider;
import React from 'react'
import KycPage from './KycPage'
import { IUser, KYC, KycForm } from '../../../types/dataTypes'
import { FormStateType } from '../../../types/formTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { Navigate } from 'react-router-dom'

function Kyc() {
    const {user,kyc,kycForm} = useSelector((state:RootState)=>state.userSlice)
    const {process_step} = user!;
    if(Number(process_step) === 3){
      return <Navigate to={'/user/dashboard'}/>
    }
  return (
    <KycPage initialFormstate={populateCurrentForm(kycForm!,user!,kyc!,initialKycformState)}/>
  )
}

export default Kyc



function populateCurrentForm(kycForm:Partial<KycForm>,user:IUser,kyc:KYC,initialformState:FormStateType){
    
      const len = !kycForm ? 0 :  Object.values(kycForm).length;
      console.log(len);
      console.log(kycForm);
      
      if(len > 0){
        console.log('kycform');
        for(let key in kycForm){
          initialformState[key].value = kycForm[key as keyof KycForm] as string;
        }
        return (initialformState);
      }
      else{
        console.log('user , kyc');
        
        for(let key in initialformState){
          if(user[key as keyof IUser]){
            initialformState[key].value = user[key as keyof IUser] as string;
          }
          else if(kyc && kyc[key as keyof KYC]){
            initialformState[key].value = kyc[key as keyof KYC] as string;
          }
        }
        return (initialformState);
      }
    
  }
  


export const initialKycformState = {
    first_name: {
      value: "",
      status: false,
      message: "",
    },
    last_name: {
      value: "",
      status: false,
      message: "",
    },
    contact: {
      value: "",
      status: false,
      message: "",
    },
    dob: {
      value: "",
      status: false,
      message: "",
    },
  
    address: {
      value: "",
      status: false,
      message: "",
    },
    occupation: {
      value: "",
      status: false,
      message: "",
    },
    document_id: {
      value: "",
      status: false,
      message: "",
    },
  };
  
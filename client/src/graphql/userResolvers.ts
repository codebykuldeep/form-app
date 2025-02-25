import { client } from "..";
import { FormStateType } from "../types/formTypes";
import { getToken } from "../utils/auth-utils";
import { SUBMIT_FORM, TERMS_QUERY, UPDATE_BANK, UPDATE_KYC } from "./userQueries";

export async function accpetTermsRequest(){
    const {data} = await client.query({query:TERMS_QUERY,context:{
        headers:{
            Authorization:getToken()
        }
    }});
    const response = data.acceptTerms;
    return response;
}


export async function updateKYC(formState:FormStateType){
    const dataArr =[];
    for(let key in formState){
        dataArr.push([key,formState[key].value]);
    }
    const kycData = Object.fromEntries(dataArr);
    const {data} = await client.mutate({mutation:UPDATE_KYC,
         variables:{
            kyc:kycData
         },
        context:{
        headers:{
            Authorization:getToken()
        }
    }});
    const response = data.updateKyc;
    return response;
}

export async function updateBank(tellerData:unknown){
    
    const {data} = await client.mutate({mutation:UPDATE_BANK,
        variables:{
           bank:tellerData
        },
       context:{
       headers:{
           Authorization:getToken()
       }
   }});
   const response = data.updateBank;
   console.log(response);
   
   return response;
}


export async function submitForm(){
    const {data} = await client.query({query:SUBMIT_FORM,
       context:{
       headers:{
           Authorization:getToken()
       }
   }});
   const response = data.submitDetail;
   
   return response;
}
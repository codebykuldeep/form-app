import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Bank, IUser, KYC, KycForm } from '../types/dataTypes';
import { client } from '..';
import { LOGIN_QUERY } from '../graphql/authQueries';
import { FetchResult } from '@apollo/client';
import { LoginResponse } from '../types/FetchResults';
import { getToken, setToken } from '../utils/auth-utils';
import { FormStateType } from '../types/formTypes';
import { authenticateUser } from '../graphql/queryResolvers';



export interface UserState {
  user: IUser | null;
  kyc:KYC | null;
  bank:Bank | null;
  kycForm : Partial<KycForm> | null;
  loading:true | false;
  error:string,
}

export const initialState: UserState  = {
  user:null,
  kyc:null,
  bank:null,
  kycForm:null,
  loading:false,
  error:''
}



export const LoginUser = createAsyncThunk('/user/updateUser',async(arg:{email:string,password:string},{rejectWithValue})=>{
    const {email,password} = arg;
    try {
        const response:FetchResult<LoginResponse> = await client.mutate({mutation:LOGIN_QUERY,variables:{email,password}});
        const {data} = response;
       const {message,status,token,user,kyc,bank} = data!.login;
        if(Boolean(status)){
            setToken(token);
            return {user,kyc,bank};
        }
        else{
            throw new Error(message)
        }
    } catch (error) {
        const {message} = error as {message:string};
        console.log(error)
        return rejectWithValue(message);
    }
})


export const VerifyUser = createAsyncThunk('/user/verifyUser',async(_,{rejectWithValue})=>{
 
  try {
      const userToken = getToken();
      const data = await authenticateUser(userToken!);
      debugger;
     const {message,status,token,user,kyc,bank} = data;
      if(Boolean(status)){
          setToken(token);
          return {user,kyc,bank};
      }
      else{
          throw new Error(message)
      }
  } catch (error) {
      const {message} = error as {message:string};
      console.log(error)
      return rejectWithValue(message);
  }
})


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setState:(state,action: PayloadAction<{user:IUser,kyc:KYC,bank:Bank}>)=>{
      state.kyc = action.payload.kyc;
      state.user = action.payload.user;
      state.bank = action.payload.bank;
    },
    setUser: (state,action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    removeState: (state) => {
      state.user = null;
    },
    removeError:(state)=>{
        state.error = '';
    },
    setKYC:(state,action: PayloadAction<KYC | null>) => {
      state.kyc = action.payload;
    },
    setBank:(state,action: PayloadAction<Bank | null>) => {
      state.bank = action.payload;
    },
    nextProcess:(state)=>{
      if(state.user){
        state.user.process_step = state.user.process_step + 1;
      }
    },
    changeKycForm:(state,action: PayloadAction<FormStateType>)=>{
      const kycData:Partial<KycForm> ={};
      for(let key in action.payload){
        kycData[key as keyof KycForm] = action.payload[key].value as unknown as  undefined;
      }
      state.kycForm = kycData;
    }
  },
  extraReducers(builder) {
    builder.addCase(LoginUser.pending,(state,action)=>{
        state.loading = true;
        state.error = '';
    })
    builder.addCase(LoginUser.fulfilled,(state,action)=>{
      state.user = action.payload.user;
      state.kyc = action.payload.kyc;
      state.bank = action.payload.bank
      state.loading = false;
      state.error = '';

    })
    builder.addCase(LoginUser.rejected,(state,action)=>{
        state.loading = false;
        state.error = String(action.payload);
    })
    builder.addCase(VerifyUser.pending,(state,action)=>{
      state.loading = true;
      state.error = '';
    })
  builder.addCase(VerifyUser.fulfilled,(state,action)=>{
    state.user = action.payload.user;
    state.kyc = action.payload.kyc;
    state.bank = action.payload.bank
    state.loading = false;
    state.error = '';

  })
  builder.addCase(VerifyUser.rejected,(state,action)=>{
      state.loading = false;
      state.error = String(action.payload);
  })
  },
})


export const userActions = userSlice.actions

export default userSlice;
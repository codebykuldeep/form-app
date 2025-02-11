import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/dataTypes';
import { client } from '..';
import { LOGIN_QUERY } from '../graphql/authQueries';
import { FetchResult } from '@apollo/client';
import { LoginResponse } from '../types/FetchResults';
import { setToken } from '../utils/auth-utils';



export interface UserState {
  user: IUser | null;
  loading:true | false;
  error:string,
}

export const initialState: UserState  = {
  user:null,
  loading:false,
  error:''
}



export const LoginUser = createAsyncThunk('/user/updateUser',async(arg:{email:string,password:string},{rejectWithValue})=>{
    const {email,password} = arg;
    try {
        const response:FetchResult<LoginResponse> = await client.mutate({mutation:LOGIN_QUERY,variables:{email,password}});
        const {data} = response;
       const {message,status,token,user} = data!.login;
        if(Boolean(status)){
            setToken(token);
            return user;
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
    setUser: (state,action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    removeState: (state) => {
      state.user = null;
    },
    removeError:(state)=>{
        state.error = '';
    }
  },
  extraReducers(builder) {
    builder.addCase(LoginUser.pending,(state,action)=>{
        state.loading = true;
        state.error = '';
    })
    builder.addCase(LoginUser.fulfilled,(state,action)=>{
      state.user = action.payload;
      state.loading = false;
      state.error = '';

    })
    builder.addCase(LoginUser.rejected,(state,action)=>{
        state.loading = false;
        state.error = String(action.payload);
    })
  },
})


export const userActions = userSlice.actions

export default userSlice;
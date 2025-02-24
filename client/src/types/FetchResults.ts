import { Bank, IUser, KYC } from "./dataTypes";

//LOGIN RESULT 
export interface LoginResponse{
    login:{
        status:boolean;
        message:string;
        user:IUser;
        token:string;
        kyc:KYC
        bank:Bank
    }
}

export interface RegisterResponse{
    register:{
        status:boolean;
        message:string;
    }
}
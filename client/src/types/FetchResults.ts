import { IUser } from "./dataTypes";

//LOGIN RESULT 
export interface LoginResponse{
    login:{
        status:boolean;
        message:string;
        user:IUser;
        token:string;
    }
}

export interface RegisterResponse{
    register:{
        status:boolean;
        message:string;
    }
}
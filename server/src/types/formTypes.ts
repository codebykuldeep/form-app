export interface LoginData{
    email:string;
    password:string;
}

export interface RegisterData{
    email:string;
    password:string;
    first_name:string;
    last_name:string;
    dob:string;
}

export interface GoogleData{
    credential:string;
    clientId:string;
}

export interface GooglePayload{
    name:string;
    email:string;
    email_verified:boolean;
}
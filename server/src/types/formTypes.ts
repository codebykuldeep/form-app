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

export interface kycInput{
    first_name:string;
    last_name:string;
    dob:string;
    contact:string;
    address:string;
    occupation:string;
    document_id:string;
}

export interface bankInput{
    access_token:string;
    user_id:string;
}
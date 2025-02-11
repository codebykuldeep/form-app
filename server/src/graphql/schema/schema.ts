
export const graphQLSchema = `#graphql

type User{
    user_id:ID
    email:String
    first_name:String
    last_name:String
    contact:String
    auth_source:String
    email_verified:Boolean
    process_step:Int
    created_at:String
    updated_at:String
}


type KYC{
    kyc_id:ID
    user_id:ID
    created_at:String
    updated_at:String
}


type Bank{
    bank_id:ID
    user_id:ID
    created_at:String
    updated_at:String
}

type AuthData{
    user:User
    token:String
    status:Boolean
    message:String
}

type VerifyResponse{
    message:String
    status:Boolean
    user:User
}

type RegisterResponse{
    message:String
    status:Boolean
}


type Query{
    auth:AuthData
    verify(token:String!):VerifyResponse
    verifyEmail(token:String!):VerifyResponse
    acceptTerms:VerifyResponse
}

type Mutation{
    login(email:String!,password:String!):AuthData
    register(email:String!,password:String!,first_name:String!,last_name:String!,dob:String!):RegisterResponse
    googleAuthLogin(credential:String!,clientId:String!):AuthData
}

`;
    
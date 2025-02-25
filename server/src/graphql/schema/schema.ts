
export const graphQLSchema = `#graphql

type User{
    user_id:ID
    email:String
    first_name:String
    last_name:String
    dob:String
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
    address:String
    occupation:String
    document_id:String
    created_at:String
    updated_at:String
}


type Bank{
    bank_id:ID
    user_id:ID
    bank_data:String
    teller_user_id:String
    created_at:String
    updated_at:String
}

type AuthData{
    user:User
    kyc:KYC
    bank:Bank
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

type BankResponse{
    bank:Bank
    message:String
    status:Boolean
}
input kycInput{
    first_name:String!
    last_name:String
    dob:String
    contact:String
    address:String
    occupation:String
    document_id:String
}
input bankInput{
    access_token:String
    user_id:String
}
type Query{
    auth:AuthData
    verify(token:String!):AuthData
    verifyEmail(token:String!):VerifyResponse
    acceptTerms:VerifyResponse
    submitDetail:RegisterResponse
}

type Mutation{
    login(email:String!,password:String!):AuthData
    register(email:String!,password:String!,first_name:String!,last_name:String!,dob:String!):RegisterResponse
    updateKyc(kyc:kycInput!):RegisterResponse
    updateBank(bank:bankInput):BankResponse
    googleAuthLogin(credential:String!,clientId:String!):AuthData
}

`;
    
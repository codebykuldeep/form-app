import { client } from "..";
import { EMAIL_VERIFY_QUERY, GOOGLE_AUTH_QUERY, VERIFY_TOKEN_QUERY } from "./authQueries";

export async function verifyEmailToken(token:string){
    const {data} = await client.query({query:EMAIL_VERIFY_QUERY,variables:{token}});
    const verifyEmail = data.verifyEmail;
    return verifyEmail;
}

export async function authenticateUser(token:string){
    const {data} = await client.query({query:VERIFY_TOKEN_QUERY,variables:{token}});
    const response = data.verify;
    return response;
}

export async function authenticateGoogleAuth(credential:string,clientId:string){
    const {data} = await client.mutate({mutation:GOOGLE_AUTH_QUERY,variables:{credential,clientId}});
    const response = data.googleAuthLogin;
    return response;
}
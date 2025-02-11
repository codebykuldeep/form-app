import { client } from "..";
import { getToken } from "../utils/auth-utils";
import { TERMS_QUERY } from "./userQueries";

export async function accpetTermsRequest(){
    const {data} = await client.query({query:TERMS_QUERY,context:{
        headers:{
            Authorization:getToken()
        }
    }});
    const response = data.acceptTerms;
    return response;
}
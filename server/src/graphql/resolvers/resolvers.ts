import { handleEmailVerification } from "../../controllers/email_record";
import { handleTermsRequest } from "../../controllers/forms";
import { getUserForLogin, handleGoogleAuth, registerUser, verifyUser } from "../../controllers/users";
import { Users } from "../../lib/entities/users";
import { GoogleData, LoginData, RegisterData } from "../../types/formTypes";


export const graphQLResolver = {
    Query: {
        auth: ()=>({user:{},token:'token',status:true}),
        verify:async(parent:unknown,args:{token:string}) =>{
            const {token} = args
            return await verifyUser(token)
        },
        verifyEmail:async(parent:unknown,args:{token:string}) =>{
            const {token} = args
            return await handleEmailVerification(token);
        },
        acceptTerms:async(parent:unknown, args:unknown, contextValue:{user:Users | null},)=>{
            const {user} = contextValue;
            if(!user){
                return {message:'not authorized',status:false}
            }
            
            return await handleTermsRequest(user);
        }
    },
    Mutation:{
        login:async(parent:unknown,arg:LoginData)=>{return await getUserForLogin(arg)},
        register:async(parent:unknown,arg:RegisterData)=>{return await registerUser(arg)},
        googleAuthLogin:async(parent:unknown,arg:GoogleData)=>{return await handleGoogleAuth(arg)}
    }
};


import { handleBankUpdate } from "../../controllers/banks";
import { handleEmailVerification } from "../../controllers/email_record";
import { handleTermsRequest } from "../../controllers/forms";
import { handleUpdateKYC } from "../../controllers/kyc";
import { getUserForLogin, handleGoogleAuth, registerUser, verifyUser } from "../../controllers/users";
import { Users } from "../../lib/entities/users";
import { bankInput, GoogleData, kycInput, LoginData, RegisterData } from "../../types/formTypes";


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
        },
        submitDetail:async(parent:unknown, args:unknown, contextValue:{user:Users | null},)=>{
            const {user} = contextValue;
            if(!user){
                return {message:'not authorized',status:false}
            }
            const user_id = user.user_id;
            try {
                await Users.update(user_id,{
                    process_step:3
                })
                return {message:'data submission done',status:true}
            } catch (error) {
                console.log(error);
                return {message:'data submission failed',status:false}
            }
        },
    },
    Mutation:{
        login:async(parent:unknown,arg:LoginData)=>{return await getUserForLogin(arg)},
        register:async(parent:unknown,arg:RegisterData)=>{return await registerUser(arg)},
        googleAuthLogin:async(parent:unknown,arg:GoogleData)=>{return await handleGoogleAuth(arg)},
        updateKyc:async(parent:unknown,arg:{kyc:kycInput},contextValue:{user:Users | null})=>{ 

            const {user} = contextValue;
            if(!user){
                return {message:'not authorized',status:false}
            }
            console.log(user);
            return await handleUpdateKYC(user,arg.kyc)
            
        },
        updateBank:async(parent:unknown,arg:{bank:bankInput},contextValue:{user:Users | null})=>{ 

            const {user} = contextValue;
            if(!user){
                return {message:'not authorized',status:false}
            }
            console.log(user);
            console.log(arg);
            return handleBankUpdate(user,arg.bank);
            
        },
    }
};


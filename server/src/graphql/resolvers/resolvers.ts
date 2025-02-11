import { getUserForLogin, registerUser, verifyUser } from "../../controllers/users";
import { LoginData, RegisterData } from "../../types/formTypes";


export const graphQLResolver = {
    Query: {
        auth: ()=>({user:{},token:'token',status:true}),
        verify:async(parent:unknown,args:{token:string}) =>{
            const {token} = args
            return await verifyUser(token)
        }
    },
    Mutation:{
        login:async(parent:unknown,arg:LoginData)=>{return await getUserForLogin(arg)},
        register:async(parent:unknown,arg:RegisterData)=>{return await registerUser(arg)},
    }
};


import { generateToken, verifyToken } from "../auth/jwt";
import { Users } from "../lib/entities/users";
//import { UserType } from "../types/dataTypes";
import { GoogleData, GooglePayload, LoginData, RegisterData } from "../types/formTypes"
import { ErrorObj } from "../types/dataTypes";
import { generateAndSendVerificationMail } from "./email_record";
import { OAuth2Client } from "google-auth-library";


const client = new OAuth2Client();

export async function getUserForLogin(body:LoginData){
    const {email,} = body;
    try {
        const user = await Users.findOne({where:{email:email}})
        if(!user){
            throw new Error('Invalid Credentials')
        }
        const token = generateToken(user!)
        console.log(token);
        
        
        return ({user:user,token:token,message:'login successful',status:true});
    } catch (error) {
        console.log(error);
        return ({user:{},token:'',message:(error as ErrorObj).message,status:false});
    }
}

export async function registerUser(body:RegisterData){
    const {email,password,dob,first_name,last_name} = body;
   try {
    const user = Users.create({
        email,
        password,
        dob,
        first_name,
        last_name
    })
    await user.save();
    await generateAndSendVerificationMail(user);
    
    return ({message:'Registered successful',status:true});
   } catch (error) {
    console.log(error);
    
    return ({message:'Faield to register',status:false});
   }
}



export async function verifyUser(token:string){
   try {
    console.log(token);
    
    const payload = verifyToken(token) as Users;
    if(!payload){
        throw new Error('Failed to verify');
    }
    const user = await Users.findOne({where:{email:payload.email}})
    return ({user:user,message:'Verified successful',status:true});
   } catch (error) {
    console.log(error);
    
    return ({user:{},message:'failed, invalid token',status:false});
   }
}



export async function handleGoogleAuth(body:GoogleData){
    const { credential, clientId } = body;
   try {
     const ticket = await client.verifyIdToken({
     idToken: credential,
     audience: clientId,
   });
    const payload = ticket.getPayload();
    const {email ,email_verified ,name} = payload as GooglePayload; 

    const userFound = await Users.findOne({where:{email:email}});
    if(userFound){
        const token = generateToken(userFound);
        return ({user:userFound,token:token,message:'login successful',status:true});
    }
    else{
        const user = Users.create({
            email,
            first_name:name,
            email_verified,
            auth_source:'google'
        })
        user.save();
        const token = generateToken(user);
        return ({user:user,token:token,message:'login successful',status:true});
    }
    
   } catch (err) {
    console.log(err);
    
    return ({user:null,token:'',message:'login failed',status:false})
     
   }
}
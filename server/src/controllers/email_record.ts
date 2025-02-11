import { db } from "../lib/db";
import { EmailsVerify } from "../lib/entities/email_record";
import { Users } from "../lib/entities/users";
import { sendVerificationMail } from "../services/mailServices";

export async function generateAndSendVerificationMail(user:Users){
    const {email} = user;
    const emailRecord = EmailsVerify.create({
        user:user,
        email
    })
    await emailRecord.save();
    const {unique_token} = emailRecord;
    await sendVerificationMail(email,unique_token);
    console.log('DONE');
    
}


export async function handleEmailVerification(token:string) {
    try {
        const emailRecord = await EmailsVerify.findOne({where:{unique_token:token}})
        if(!emailRecord){
            return {message:'invalid email verification request',status:false};
        }
        console.log(emailRecord);
        
        
        
        const { user,id } = emailRecord;
        const {user_id} =user;
        const userFound = await Users.findOne({where:{user_id}});

        if(!userFound){
            return {message:'invalid user , cannot verify email ',status:false};
        }

        if(userFound?.email_verified){
            return {message:'Already verified ',status:true};
        }
        
        const userTable = db.getRepository(Users);
        const emailRecordTable = db.getRepository(EmailsVerify);

        await userTable.update(user_id,{email_verified:true});
        await emailRecordTable.update(id,{status:true});
        
        
        
        console.log(userFound);
        
        return {message:'Email verification successful ',status:true};
    } catch (error) {
        console.log(error);
        
        return {message:'invalid email verification request',status:false};
    }
    
}
import { db } from "../lib/db";
import { Users } from "../lib/entities/users";

export async function handleTermsRequest(user:Users){
    const {user_id} = user;
    const userTable = db.getRepository(Users);
    userTable.update(user_id,{terms_accepted:true,process_step:1});
    return {message:'terms accepted success',status:true};
}
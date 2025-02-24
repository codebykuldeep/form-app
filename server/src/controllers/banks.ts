import { db } from "../lib/db";
import { Banks } from "../lib/entities/banks";
import { Users } from "../lib/entities/users";
import { bankInput } from "../types/formTypes";
import { getAccountData } from "../utils/teller-methods";

export async function handleBankUpdate(user: Users, bank: bankInput) {
    try {
        const access_token = bank.access_token;
    const bank_data = await getAccountData(access_token)
    console.log(bank_data);

    const bankRecord = await db.getRepository(Banks).createQueryBuilder("banks").where("banks.user_id = :user_id", { user_id: user.user_id}).getOne()
    if(!bankRecord){
        const newBank = Banks.create({
            user,
            token:access_token,
            teller_user_id:bank.user_id,
            bank_data:JSON.stringify(bank_data)
        })
        newBank.save();
        return {bank:newBank,message:'action success',status:true}
    }
    else{
        const {bank_id} = bankRecord;
        await Banks.update(bank_id,{
            token:access_token,
            teller_user_id:bank.user_id,
            bank_data:JSON.stringify(bank_data)
        })
    }
    
    const bankDetails = await db.getRepository(Banks).createQueryBuilder("banks").where("banks.user_id = :user_id", { user_id: user.user_id}).getOne()
    
    return {bank:bankDetails,message:'action success',status:true}
    } catch (error) {
        console.log(error);
        
        return {bank:null,message:'action failed',status:false}
    }
}
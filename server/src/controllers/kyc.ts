import { db } from "../lib/db";
import { Kycs } from "../lib/entities/kyc";
import { Users } from "../lib/entities/users";
import { kycInput } from "../types/formTypes";

export async function handleUpdateKYC(user: Users, kyc: kycInput) {
  const { user_id } = user;
  const {
    dob,
    first_name,
    last_name,
    contact,
    address,
    document_id,
    occupation,
  } = kyc;
  try {
    //const kycRecord = await Kycs.findOne({where:{user}});
    const kycRecord = await db.getRepository(Kycs).createQueryBuilder("kycs").where("kycs.user_id = :user_id", { user_id: user_id}).getOne()
    console.log(kycRecord);
    
    if (!kycRecord) {
      const newKyc = Kycs.create({
        address: kyc.address,
        document_id: kyc.document_id,
        occupation: kyc.occupation,
        user:user
      });
      await newKyc.save();
    } else {
      const { kyc_id } = kycRecord;
      await Kycs.update(kyc_id, {
        address,
        document_id,
        occupation,
      });
    }
    let process_step = user.process_step;
    if(process_step<=1){
        process_step = 2;
    }
    await Users.update(user_id, {
      dob,
      first_name,
      last_name,
      contact: contact,
      process_step,
    });

    return { message: "updated", status: true };
  } catch (error) {
    console.log(error);

    return { message: "updated failed", status: false };
  }
}

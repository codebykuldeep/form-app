import { verifyToken } from "../auth/jwt";
import { Users } from "../lib/entities/users";


export async function auth(token:string){
    try {
        const payload = verifyToken(token);
        const {user_id} = payload as Users;
        const user = await Users.findOne({where:{user_id}})
        return user;
    } catch  {
        return null;
    }
    
}
import config from "../config";
import jwt from 'jsonwebtoken';
//import { UserType } from "../types/dataTypes";
import { Users } from "../lib/entities/users";

const SECRET = String(config.JWT_SECRET) ;

export function generateToken(user:Users,expiry='24h'){
    const payload = JSON.parse(JSON.stringify(user));
    const token = jwt.sign(payload,SECRET,{expiresIn:expiry as unknown as number})
    return token;
}

export function verifyToken(token:string){
    const payload = jwt.verify(token,SECRET);
    return payload;
}
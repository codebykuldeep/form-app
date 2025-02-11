import process from 'node:process';
import dotenv from 'dotenv';
dotenv.config();

const config ={
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_MAIL:process.env.NODE_MAIL,
    NODE_PASS:process.env.NODE_PASS,
    CLIENT_URL:"http://localhost:3000"
}


export default config
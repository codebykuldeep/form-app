import nodemailer from 'nodemailer';
import config from '../config';


const client_url = config.CLIENT_URL;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.NODE_MAIL,
      pass: config.NODE_PASS,
    },
  });

export async function sendVerificationMail(email:string,token:string){
  console.log(transporter);
    const mailOptions = {
        from: config.NODE_MAIL,
        to: email,
        subject: "Email Verification - FormApp ",
        text: "This is a email for email verification",
        html:`<h1>EMAIL VERIFICATION</h1>
              <p>Click on the below verify button to verify</p>
              <a href='${client_url}/verify-email?v=${token}' target='_blank'><button>Verify</button></a>`
    };
    try {
      console.log('sending');
      
        const info = await transporter.sendMail(mailOptions)
        console.log(info);
        return true;
    } catch(error) {
        console.log(error);
        
        return false;
    }
  }

 
  


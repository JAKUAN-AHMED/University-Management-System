import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail=async(to:string,html:string)=>{
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: config.NODE_ENV==="production", // true for port 465, false for other ports
      auth: {
        user: config.admin_email,
        pass: config.app_pass,
      },
    });
    await transporter.sendMail({
      from: config.admin_email, // sender address
      to, // list of receivers
      subject: 'Reset your Password within 10 minutes', // Subject line
      text: 'change your password as early you can', // plain text body
      html, // html body
    });

}
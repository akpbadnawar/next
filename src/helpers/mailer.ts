import nodemailer from 'nodemailer';
import User from "@/models/userModel"
import bcryptjs from 'bcryptjs'

export const sendEmail  = async({email, emailType, userId}: any) =>{
    try {
        //create a hased token
       const hashedToken = await bcryptjs.hash(userId.toString(), 10)
       const otp = Math.floor((Math.random()*1000000)+1)

       if (emailType === 'VERIFY') {
        await User.findByIdAndUpdate(userId,{
        verifyToken: hashedToken, verifyTokenExpiry: Date.now()+ 3600000})
        console.log('verify block')
       } else if (emailType === "RESET") {
           let test =  await User.findByIdAndUpdate(userId,{
            forgotPasswordToken: otp, forgotPasswordTokenExpiry: Date.now()+ 3600000})
            console.log(test)
       }
       
       const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.Mail_UserID,
          pass: process.env.Mail_Password
        }
      });

      const mailOptions = {
        from:'test@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email": 'Reset your password',
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY'?"verify your email": "reset you password" + otp}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} 
        </p>`
      }

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;

    } catch (error:any) {
        throw new Error(error.message + "mailer")
    }
}
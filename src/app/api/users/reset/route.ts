import {connect} from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email} = reqBody;
        //check if user exists 
        
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status:400})
        } 
        
            await sendEmail({email,emailType:'RESET',userId:user._id})

            const response = NextResponse.json({
                message: "Reset OTP sent successfull",
                success: true,
                httpOnly: true
            })
            
            return response;
        }  catch (error:any) {
        return NextResponse.json({error:error.message + 'resetbackend'},{status:500})
    }
}
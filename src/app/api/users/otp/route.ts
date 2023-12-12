import {connect} from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request:NextRequest) {
    try {

        const reqBody = await request.json()
        const {email,otp} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status:400})
        }

        const validOtp = await (otp === user.forgotPasswordToken)

        if(!validOtp){
            return NextResponse.json({error:"Invalid Otp"},{status:400})
        }
        const response = NextResponse.json({
            message: "Login successfull",
            success: true,
        })
        return response;
    } catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}
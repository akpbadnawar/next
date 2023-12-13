import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, requestType } = reqBody;
    console.log(reqBody);
    await connect();

    if (requestType === "passChange") {
      const user = await User.findOne({ email });
      const userId = user._id
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      await User.findByIdAndUpdate(userId,{
        password: hashedPassword})

        return NextResponse.json({
          message: "Password changed successfull",
          success: true
        });
    } 
    
    
    
    else if (requestType === "createAcc") {
      //check if user already exists
      const user = await User.findOne({ email });
      console.log(user);
      if (user) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      }

      //hash password

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      console.log(savedUser);

      //send verification email

      await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

      return NextResponse.json({
        message: "User created successfull",
        success: true,
        savedUser,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
}

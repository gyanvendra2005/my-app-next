import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST (request:Request) {
    await connectDB()

    try {
        
       const{username,email,password} =   await request.json()
        
      const existUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified:true
       })

       if (existUserVerifiedByUsername){
          return Response.json({
            success:false,
            message:'User already exist'
          })
       }

       const existUserVerifiedByEmail = await UserModel.findOne({email})

       const verifyCode = Math.floor(100000+Math.random()*900000).toString()
       if (existUserVerifiedByEmail){
           if(existUserVerifiedByEmail.isVerified){
            return Response.json({
                success:false,
                message:'User already exist with this email'
              })
           }
           else{
              const hassedPassword = await bcrypt.hash(password,10)
              existUserVerifiedByEmail.password = hassedPassword;
              existUserVerifiedByEmail.username = username;
              existUserVerifiedByEmail.verifyCode = verifyCode;
              existUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now()+ 3600000);
              await existUserVerifiedByEmail.save();
           }
       }
       else{
        const hassedPassword = await bcrypt.hash(password,10)
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() +1)

        const newUser = new UserModel({
            username,
            email,
            password: hassedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            messages:[]
        })

         await newUser.save()

       }

       // send  verification email
       const emailResponse = await sendVerificationEmail(
           email,
           username,
           verifyCode
       )

      if(!emailResponse.success){
        return Response.json({
             success:false,
             message: emailResponse.message
        })
      }
      return Response.json({
        success:true,
        message:"User registered Successfully. Please verify your email"
      })


    } catch (error) {
        console.log('Error while signup', error);
        return Response.json(
            {
                success:false,
                meaasage: "Error registering user"
            }
        )
    }
 }
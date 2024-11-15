import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { trackSynchronousPlatformIOAccessInDev } from "next/dist/server/app-render/dynamic-rendering";

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
          return Response.json({
            success:false,
            message:'User already exist'
          })
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

       // send

      


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
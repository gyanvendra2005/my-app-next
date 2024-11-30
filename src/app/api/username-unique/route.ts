import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod'
import {usernameValidation} from '../../../schemas/signUpSchema'




const UsernameQuerySchemas = z.object({
    username: usernameValidation,
})

export async function GET(request:Request){
    await connectDB();

    try {
        const {searchParams}= new URL(request.url)
        const queryParam ={
            username: searchParams.get('username')
        }
      // validate username by zod
        const result = UsernameQuerySchemas.safeParse(queryParam)

        if(!result.success){
            // const usernameError = result.error.format().username?._errors || []

            return Response.json({
                success:false,
                message: 'username must have atlest 4 characters'
            })
        }

        const {username} = result.data

         const existingVerifiedUser = await UserModel.findOne({
            username, 
            isVerified:true
        })

        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message: 'username already taken'
            })
        }

        return Response.json({
            success:true,
            message: 'username available'
        })

    } catch (error) {
        console.error("Error checking username",error);
        return Response.json({
            success:false,
            message:'Error checking username'
        })
    }
}
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request){
    await connectDB();

    try {
        const {username,code} = await request.json()
        const decodeduser = decodeURIComponent(username);
        const user = await UserModel.findOne({
            username:decodeduser
        })
        
        if(!user){
            return Response.json({
                success:false,
                message:'user not found'
            })
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()
            return Response.json({
                success:true,
                message:'user verified'
            })
        }
        else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:'Verification Code Expired'
            })
        }
        else {
            return Response.json({
                success:false,
                message:'Verification is incorrect'
            })
        }



    } catch (error) {
        console.error("Error while verifying",error);
        return Response.json({
            success:false,
            message:'Not verified'
        })
    }
}


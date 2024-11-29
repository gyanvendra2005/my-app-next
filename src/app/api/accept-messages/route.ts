import { getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option"; 
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request){
    await connectDB();

    const session = await getServerSession(authOptions)
    const user = session?.user

    if(!session || !user){
        return Response.json({
            success:false,
            message:'Not Authenticated'
        })
    }

    const userId = user.id;
    const {acceptMessages} = await request.json()
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage:acceptMessages},
            {new:true}
        )
        if(!updatedUser){
            return Response.json({
                success:false,
                message:'user not found'
            })
        }
        return Response.json({
            success: true,
            message:'Message acceptance status updated successfully'
        })

    } catch (error) {
        console.log(error);
        
        return Response.json({
            success:false,
            message:'Failed to update user status to accept message'
        })
    }
}

export async function GET(request:Request) {
    console.log(request);
    
    await connectDB();

    const session = await getServerSession(authOptions)
    const user = session?.user

    if(!session || !user){
        return Response.json({
            success:false,
            message:'Not Authenticated'
        })
    }

    const userId = user.id;

    try {
        const foundUser = await UserModel.findById(userId)

        if(!foundUser){
            return Response.json({
                success:false,
                message:'user not found'
            })
        }
        return Response.json({
            success:true,
            isAcceptingMessages: foundUser.isAcceptingMessage
        })
    
    } catch (error) {
        console.log(error);
        
        return Response.json({
            success:false,
            message:'user not found'
        })
    }

}

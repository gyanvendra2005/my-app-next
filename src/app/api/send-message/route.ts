import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {Message} from "@/model/User";

export async function POST(request:Request){
    await connectDB();

    const {username, content}=await request.json()

    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success: false,
                message:'User not found'
            })
        }
        if(!user.isAcceptingMessage){
            return Response.json({
                success: false,
                message:'user not accepting messages'
            })
        }
        
        const newMessage = {content, createdAt : new Date()}

        user.messages.push(newMessage as Message)
        await user.save();
        return Response.json({
            success: true,
            message:'Message sent succesfully'
        })

    } catch (error) {
        return Response.json({
            success: false,
            message:'Unexpected error'
        })   
    }
}
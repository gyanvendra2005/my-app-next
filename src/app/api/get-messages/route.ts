import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option"; 
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function GET(request:Request) {
    await connectDB();
    const session = await getServerSession(authOptions)
    const user = session?.user

    if(!session || !user){
        return Response.json({
            success:false,
            message:'Not Authenticated'
        })
    }

    const userId = new mongoose.Types.ObjectId(user._id);
    
    try {
        const user = await UserModel.aggregate([
            {$match: {_id:userId}},
            {$unwind:'$messages'},
            {$sort:{'messages.createdAt':-1}},
            {$group:{_id:'$_id',messages:{$push:'$messages'}}}
        ])
        if(!user||user.length ===0){
            return Response.json({
                success: false,
                message:'No User Found'
            })
        }
        return Response.json({
            success: true,
            messages:  user[0].messages
        })

    } catch (error) {
        return Response.json({
            success: false,
            message:'Unexpected error'
        })
    }


}
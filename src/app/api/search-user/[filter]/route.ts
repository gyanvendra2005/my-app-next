import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option"; 
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { FilterIcon, FilterX } from "lucide-react";
// import mongoose from "mongoose";

export async function GET(
    request:Request,
  { params }: any
) {
    // console.log(request);
    console.log("hi");
    const username = params.filter;
    await connectDB();
    const session = await getServerSession(authOptions)
    const user = session?.user
    
   
    
    console.log(username);
    

    if(!session || !user){
        return Response.json({
            success:false,
            message:'Not Authenticated'
        })
    }

    // const userId = new mongoose.Types.ObjectId(user.id);
    
    try {
        const users = await UserModel.find({
                    username:{
                        "$regex":username
                    }
                
        })
        // console.log(users);
        const user = users.map(user=>({
            username:user.username
        }))
        console.log(user);
        
        
        if(!user){
            return Response.json({
                success: false,
                message:'No User Found'
            })
        }
        return Response.json({
            user
        })

    } catch (error) {
        console.log(error);
        
        return Response.json({
            success: false,
            message:'Unexpected error'
        })
    }


}
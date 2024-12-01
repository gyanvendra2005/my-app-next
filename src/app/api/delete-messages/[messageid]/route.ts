import UserModel from '@/model/User';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';
// import { Message } from '@/model/User';
// import { NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/option';
// import { ObjectId } from 'mongodb';

export async function POST(
  request: Request,
  { params }: any
) {
    // console.log(request);
    
  const messageId = params.messageid;


//   if (!messageId || !ObjectId.isValid(messageId)) {
//     return Response.json(
//       { success: false, message: 'Invalid message ID format' },
//       { status: 400 }
//     );
//   }
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  console.log(user.id);
  
  try {
    const updateResult = await UserModel.updateOne(
      { _id: user.id },
      { $pull: { messages: { _id: messageId } } }
    );
  //   const messageId = "674976d857b13d424b1f66de"; // The ID of the message you want to delete
  //   const updateResult = await UserModel.updateOne(
  // { _id: "6748a96fc44ead4a25e45ee9" },
  // { $pull: { messages: { _id: messageId } } }
// );

    console.log(updateResult);
    
    // await updateResult.save()
    // await UserModel.findOneAndUpdate(
    //       { _id: _user._id },
    //       { $pull: { messages: { _id: messageId } } },
    //     // { $pull: { messages: { _id: new ObjectId(messageId) } } }
    //     );

    //  await UserModel.aggregate([
    //     {
    //       $match: { _id: _user._id } // Find the user
    //     },
    //     {
    //       $set: {
    //         messages: {
    //           $filter: {
    //             input: "$messages", // The array we want to filter
    //             as: "message", // Alias for each element in the array
    //             cond: { $ne: ["$$message._id", messageId] } // Remove the message with the specified _id
    //           }
    //         }
    //       }
    //     },
    //     {
    //       $project: {
    //         messages: 1, // Only return the updated messages array
    //       }
    //     }
    //   ]);

    // if (updateResult.modifiedCount === 0) {
    //   return Response.json(
    //     { message: 'Message not found or already deleted', success: false },
    //     { status: 404 }
    //   );
    // }

    return Response.json(
      { message: 'Message deleted', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}
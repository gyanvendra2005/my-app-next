import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/User";


export const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            id:"credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any> {
                await connectDB()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error('No user found with this email')
                    }
                    if(!user.isVerified){
                        throw new Error('User is not verified, Please verify it')
                    }
                    const isPasswordCorrect =  await bcrypt.compare(credentials.password, user.password)

                    if(isPasswordCorrect){
                        return user
                    }
                    else{
                        throw new Error('Password is incorrect')
                    }

                } catch (error:any) {
                    throw new error
                }
              }
        })
    ],
    callbacks:{
       
          async jwt({ token, user  }) {
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessage = user.isAcceptingMessages;
                token.username =  user.username;
            }
            return token
          },
          async session({ session, token }) {
            if(token){
                session.user.id = token._id?.toString()
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username =  token.username
            }
            return session
          }
    },
    pages:{
        signIn: '/signin'

    },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET || "gyani2004"
}
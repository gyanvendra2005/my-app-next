import {z} from 'zod'
 
export const usernameValidation = z.string().max(30,"username should not have more then 30 characters ").min(4,"Username must be atleast 2 character")

export  const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invaild email address"}),
    password:z.string().min(8,{message:"Password should have atleast 8 character"})
    
})

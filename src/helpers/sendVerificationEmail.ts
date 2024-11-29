import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse} from "@/types/ApiResponse";
// import { promises } from "dns";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse> {
    try {

        await resend.emails.send({
            from: 'onWay@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({username, otp :verifyCode})
          });
        return {success:true,message:'email sent successfully'}
    } catch (emailError) {
        console.log('sendVerificationEmail Error', emailError);
        return {success:false,message:'An error occured while sending the verification email'}
        
    }
}

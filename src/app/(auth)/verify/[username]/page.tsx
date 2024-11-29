'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import {useForm } from 'react-hook-form'
// import * as z from 'zod'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const  VerifyAccount = () => {
    const router = useRouter()
    const params = useParams()
    const {toast} = useToast()
    const [value, setValue] = React.useState("")

    // zod implementation
    const form = useForm({
    resolver:zodResolver(verifySchema),
  })

  const onSubmit = async() => {
    try {
        const response = await axios.post('/api/verify-code',{
            username: params.username,
            code: value
        })
        toast({
            title:"Success",
            description:response.data.message
        })
        router.replace('/signin')
    } catch (error) {
        console.log("Error in sign up of user",error);
          toast({
            title:"Otp Not verified",  
            variant:"destructive",
          })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-4">Verify Your Account</h1>
        <p className="text-gray-500 mb-6">We have sent an email with a one-time password (OTP). Please enter it below.</p>
      </div>
  
      <div className="space-y-4">
        <InputOTP
          id="code"
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
          className="space-x-2 flex justify-center"
        >
          <InputOTPGroup className="flex justify-between gap-2">
            <InputOTPSlot index={0} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={1} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={2} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={3} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={4} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={5} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
          </InputOTPGroup>
        </InputOTP>
  
        <div className="text-center text-sm text-gray-600 mt-4">
            <>Enter your one-time password.</>
        </div>
      </div>
  
      <Button
        // type="submit"
        className="w-full py-3 mt-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  </div>
  
  )
}

export default  VerifyAccount

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
import * as z from 'zod'

const  verifyAccount = () => {
    const router = useRouter()
    const params = useParams()
    const {toast} = useToast()

    // zod implementation
    const form = useForm({
    resolver:zodResolver(verifySchema),
  })

  const onSubmit = async(data:z.infer<typeof verifySchema>) => {
    try {
        const response = await axios.post('/api/verify-code',{
            username: params.username,
            code: data.code
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
  <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-lg space-y-8">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
        Verify Your Account
      </h1>
      <p className="text-gray-500 mb-6">
        We have sent an email with a one-time password (OTP). Please enter it below.
      </p>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="code" className="text-sm font-medium text-gray-700">
                OTP
              </FormLabel>
              <FormControl>
                <Input
                  id="code"
                  placeholder="OTP"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm mt-1" />
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          className="w-full py-3 mt-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Submit
        </Button>
      </form>
    </Form>
  </div>
</div>


  )
}

export default  verifyAccount

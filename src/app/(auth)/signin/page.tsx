'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const signinPage = () => {
    const [isSubmitting, setisSubmitting] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    // zod implementation
    const form = useForm({
        resolver:zodResolver(signInSchema),
        defaultValues:{
          identifier:"",
          password:''
        }
      })

    const onSubmit = async (data:z.infer<typeof signInSchema>) => {
         setisSubmitting(true)
        const response =  await signIn('credentials',{
            redirect:false,
            identifier: data.identifier,
            password: data.password
        })
        if(response?.error){
            toast({
                title:"Login Failed",
                description:"Invalid Credentials"
            })
        }
        else{
          router.replace('/dashboad');
            toast({
                title:"Login Successfull"
            })
        }
        // if(response?.url){
        //     router.replace('/dashboad');
        // }
        setisSubmitting(false)
    }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg my-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight lg:text-5xl mb-4">
          Join Mystery Message
        </h1>
        <p className="text-gray-500 mb-6">
          Sign In to start your anonymous adventure
        </p>
      </div>
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    placeholder="Enter username"
                    {...field}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
    
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    {...field}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
          >
            { isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
  
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Not have an Account?{' '}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
              Sign Up
            </Link>
          </p>
        </div>
      </Form>
    </div>
  </div>
  
  )
}


export default  signinPage




'use client'

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from 'next/link'
import axios from 'axios'
import {useDebounceCallback} from'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'



const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setisCheckingUsername] = useState(false)
  const [isSubmitting, setisSubmitting] = useState(false)
  const debounced = useDebounceCallback(setUsername,300)
  const { toast } = useToast()
  const router = useRouter()
  
  // zod implementation
  const form = useForm({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      username:"",
      email:"",
      password:''
    }
  })

  useEffect(() => {
        const checkusernameUnique = async () => {
          if(username){
            setisCheckingUsername(true)
            setUsernameMessage('')

            try {
              const response = await axios.get(`/api/username-unique?username=${username}`)
              setUsernameMessage(response.data.message)
            } catch (error) {
              setUsernameMessage("Error while checking username")
            }
            finally{
              setisCheckingUsername(false)
            }
          }
        }
        checkusernameUnique()
      },[username])
  
 const onSubmit  = async (data:z.infer<typeof signUpSchema>)=>{
        
        setisSubmitting(true)
        try {
          console.log(data);
          const response = await axios.post('/api/sign-up', data)
          toast({
            title:'success',
            description:response.data.message
          })
          if(response.data.success){
            router.replace(`/verify/${username}`)
          }
          setisSubmitting(false)
        } catch (error) {
          console.log("Error in sign up of user",error);
          toast({
            title:"Signup failed",            variant:"destructive",
          })
          setisSubmitting(false)
        }
 }

  return (
 
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg my-10">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight lg:text-5xl mb-4">
        Join Mystery Message
      </h1>
      <p className="text-gray-500 mb-6">
        Sign up to start your anonymous adventure
      </p>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
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
                  onChange={(e) => {
                    field.onChange(e);
                    debounced(e.target.value);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </FormControl>
              {isCheckingUsername && (
                <Loader2 className="animate-spin h-5 w-5 text-gray-500 mt-2" />
              )}
              <p
                className={`text-sm ${usernameMessage === 'username available' ? 'text-green-500' : 'text-red-500'} mt-2`}
              >
                {usernameMessage}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
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
                  placeholder="Create a password"
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
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already a member?{' '}
          <Link href="/signin" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
            Sign in
          </Link>
        </p>
      </div>
    </Form>
  </div>
</div>

  )
}

export default page

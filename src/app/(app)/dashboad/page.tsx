'use client'
import MessageCard from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Message } from '@/model/User'
import { acceptMessagesSchema } from '@/schemas/acceptMeassageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { ClipboardIcon, Loader2, RefreshCcw } from 'lucide-react'
// import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


const Page = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const[isSwitchLoading, setIsSwitchLoading] = useState(false)


    const{toast}= useToast()

     const handleDelete = (messageId:string)=>{
        setMessages(messages.filter((message)=> message._id !== messageId))
     }

     const{data:session} = useSession()
      
     const form = useForm({
        resolver: zodResolver(acceptMessagesSchema)
     })

     const {register,watch, setValue} = form

     const acceptMessages = watch('acceptMessages')

     const fetchAcceptMessage = useCallback( async()=>{
        setIsSwitchLoading(true)
        try {
           const response = await axios.get('/api/accept-messages')
           setValue('acceptMessages', response.data.isAcceptingMessage)

        
        } catch (error) {
            // const axiosError = error as AxiosError<ApiResponse>
            console.log(error);
            
            toast({
                title:"Error",
                // description: axiosError.response?.data.message || "Failes to fetch message settings"
            })
        }
        finally{
            setIsSwitchLoading(false)
        }

     },[setValue])

   
    const fetchMessages = useCallback( async(refresh:boolean = false) => {
       setIsLoading(true)
       setIsSwitchLoading(false)
       try {
          const response = await axios.get('/api/get-messages')
          setMessages(response.data.messages)
          if(refresh){
            toast({
                title:response.data.message,
                description: "Showing Latest Messages "
            })
          }
       } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
            toast({
                title:"Error",
                description: axiosError.response?.data.message || "Failes to fetch message settings"
            })
        }
        finally{
            setIsSwitchLoading(false)
            setIsLoading(false)
        }

    },[setIsLoading,setMessages])

    useEffect(()=>{
        if(!session || !session.user) return;
        fetchMessages()
        fetchAcceptMessage()
    },[session,setValue,fetchAcceptMessage,fetchMessages])

    // handle switch change

    const handleSwitchChange = async()=>{
        try {
            const response =  await axios.post('/api/accept-messages',{
             acceptMessages: !acceptMessages
            })
            setValue('acceptMessages', !acceptMessages)
            toast({
                title:response.data.message,
                // title:"error"
            })

         } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast({
                title:"Error",
                description: axiosError.response?.data.message || "Failes to fetch message settings"
            })
         }
    }

   const username = session?.user?.username;
   const baseUrl =`${window.location.protocol}//${window.location.host}`
   const profileUrl = `${baseUrl}/u/${username}`

   const copyToClipboard = ()=>{
    navigator.clipboard.writeText(profileUrl)
    toast({
        title:"URL copied"
    })
   }

    if(!session || !session.user){
        return <div>
            please login
        </div>
    }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded-xl w-full max-w-6xl shadow-xl">
    <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">User Dashboard</h1>
  
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Copy Your Unique Link</h2>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={profileUrl}
          disabled
          className="input input-bordered w-full p-3 bg-gray-100 text-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={copyToClipboard}
          className="btn btn-primary px-6 py-2 text-sm font-medium rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <ClipboardIcon className="w-5 h-5" />
          Copy
        </Button>
      </div>
    </div>
  
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Message Settings</h2>
      <div className="flex items-center space-x-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
          className="w-10 h-6"
        />
        <span className="text-gray-700">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
    </div>
    
    <Separator className="mb-6" />
  
    <div className="flex justify-center mb-6">
      <Button
        className="mt-4 px-6 py-2 rounded-md border-2 border-gray-400 text-gray-700 hover:bg-gray-100"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        ) : (
          <RefreshCcw className="h-4 w-4 text-blue-500" />
        )}
        {isLoading ? 'Loading...' : 'Refresh Messages'}
      </Button>
    </div>
  
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message) => (
          <MessageCard
            key="hi"
            message={message}
            onMessageDelete={handleDelete}
          />
        ))
      ) : (
        <div className="col-span-3 text-center text-gray-500">
          No messages to display.
        </div>
      )}
    </div>
  </div>
  
  )
}

export default Page

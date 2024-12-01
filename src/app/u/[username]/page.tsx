'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast'
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import UserCard from '@/components/UserCard';
import { FaSearch } from "react-icons/fa";

const specialChar = '||';


const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const {toast} = useToast()

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error appropriately
    }
  };

  const [users, setUser] = useState([])
  const [filter, setFilter] = useState("")

    const searchUser = async() => {
      console.log("hi");
      
      try {
        const response  =await axios.get(`/api/search-user/${filter}`)
        setUser(response.data.user)
        console.log(response.data.user[0].username);
        
        
      } catch (error) {
        setUser([])
        toast({
          title: 'Error',
          description: "User not found",
        });
      }
      console.log(users);
      
    }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-sm max-w-4xl">
  <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
    Public Profile Link
  </h1>

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-medium text-gray-700">
              Send Anonymous Message to @{username}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Write your anonymous message here"
                className="resize-none p-4 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-center">
        {isLoading ? (
          <Button
            disabled
            // className="flex items-center bg-gray-400 text-white hover:bg-gray-500 transition-all duration-300 px-6 py-3 rounded-md"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isLoading || !messageContent}
            // className="bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300 px-6 py-3 rounded-md"
          >
            Send It
          </Button>
        )}
      </div>
    </form>
  </Form>

  {/* <Separator className="mb-6" /> */}

  {/* Search User Section */}
  <div className="mt-6">
    <div className="flex justify-center items-center space-x-2 mb-4">
      <div className="relative w-2/3">
       <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full pl-10 focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="Search for users..."
         />
         <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <Button
        onClick={searchUser}
        className="btn btn-primary px-6 py-2 text-sm font-medium rounded-md focus:ring-2 focus:ring-blue-500"
        disabled={isSuggestLoading}
      >
        Search User
      </Button>
    </div>
  </div>

  <Separator className="mb-6" />

  {/* User Cards Section - No Grid Layout */}
  <div className="mt-8 space-y-6">
    {users.map((user) => (
      <UserCard user={user} key={Math.random()} />
    ))}
  </div>

  <Separator className="mb-6" />

  {/* Suggested Messages Section */}
  <div className="space-y-4 my-8">
    <div className="space-y-2">
      <Button
        onClick={fetchSuggestedMessages}
        className="btn btn-primary px-6 py-2 text-sm font-medium rounded-md focus:ring-2 focus:ring-blue-500"
        disabled={isSuggestLoading}
      >
        Suggest Messages
      </Button>
      <p className="text-center text-gray-600">Click on any message below to select it.</p>
    </div>
    <Card className="shadow-sm">
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-800">Suggested Messages</h3>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {error ? (
          <p className="text-red-500 text-center">{error.message}</p>
        ) : (
          parseStringMessages(completion).map((message, index) => (
            <Button
              key={index}
              variant="outline"
              className="btn btn-primary px-6 py-2 text-sm font-medium rounded-md focus:ring-2 focus:ring-blue-500"
              onClick={() => handleMessageClick(message)}
            >
              {message}
            </Button>
          ))
        )}
      </CardContent>
    </Card>
  </div>

  <Separator className="my-6" />

  {/* Create Account Section */}
  <div className="text-center">
    <div className="mb-4 text-lg text-gray-600">Get Your Message Board</div>
    <Link href={'/sign-up'}>
      <Button className="btn btn-primary px-6 py-2 text-sm font-medium rounded-md focus:ring-2 focus:ring-blue-500">
        Create Your Account
      </Button>
    </Link>
  </div>
</div>


  );
}
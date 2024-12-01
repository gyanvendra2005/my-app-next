'use client'
// import SendMessage from '@/app/u/[username]/page';
import { toast } from '@/hooks/use-toast';
// import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'




  

const UserCard = ({user}:any) => {

    const router = useRouter();
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const url = `${window.location.protocol}//${window.location.host}`;
          setBaseUrl(url); 
        }
      }, []);

    const profileUrl = `${baseUrl}/u/${user.username}`
    const SendMessage = () => {
        console.log(profileUrl);
        
       try {
        router.push(profileUrl); 
        toast({
            title:`sendind message to ${user.username}`
        })
      
       } catch (error) {
        toast({
            title:`failed to send message`
        })
       }
    }
    
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm rounded-lg">
  {/* Left Side: User Profile */}
  <div className="flex items-center space-x-4">
    {/* Avatar */}
    <div className="rounded-full h-14 w-14 bg-slate-200 flex justify-center items-center text-xl font-semibold text-gray-700">
      {user.username[0].toUpperCase()}
    </div>

    {/* Username */}
    <div className="flex flex-col justify-center">
      <div className="text-lg font-semibold text-gray-800">{user.username}</div>
    </div>
  </div>

  {/* Right Side: Send Message Button */}
  <div className="flex justify-end">
  <button
      onClick={SendMessage}
      type="button"
      className="w-36 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2 transition-all duration-200 ease-in"
    >
      Send Message
    </button>
  </div>
</div>

  )
}

export default UserCard

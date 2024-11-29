'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Message } from "@/model/User"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import dayjs from 'dayjs';
  
type MessageCardProps ={
  message:Message;
  onMessageDelete: (messageId:string) => void
}

const MessageCard = ({message, onMessageDelete}:MessageCardProps) => {

  const {toast} = useToast()
  const handleDelete = async () => {
    const response = await axios.delete(`/api/delete-message/${message._id}`)
    toast({
      title: response.data.message
    })
    onMessageDelete(message._id) 
  }

  console.log(message);
  

  return (
<Card className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300">
  <CardHeader>
    <div className="flex justify-between items-center">
      <CardTitle className="text-xl font-semibold text-gray-800">{message}</CardTitle>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="bg-red-600 text-white hover:bg-red-700 rounded-md p-3 transition-all ease-in-out duration-200 flex items-center justify-center space-x-2"
          >
            <X className="w-5 h-5" /> {/* Delete Icon */}
            <span className="text-sm">Delete</span> {/* Button Text */}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white rounded-lg shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 font-semibold text-lg">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700 text-sm">
              This action cannot be undone. This will permanently delete this message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-gray-700 hover:text-gray-900">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white rounded-lg px-6 py-3 hover:bg-red-700 transition-all duration-200"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    <div className="text-sm text-gray-600">
      {message.createdAt ? dayjs(message.createdAt).format('MMM D, YYYY h:mm A') : 'Invalid Date'}
    </div>
  </CardHeader>
  <CardContent className="text-gray-700">{/* Additional content can go here */}</CardContent>
</Card>

  
  )
}

export default MessageCard

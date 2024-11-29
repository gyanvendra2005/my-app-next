'use client'

import React from 'react'
import Link from 'next/link'
import {  signOut, useSession } from 'next-auth/react'
import { User } from 'next-auth'
import {Button} from './ui/button'
import { FaUser } from 'react-icons/fa';

const Navbar = () => {

    const {data:session}= useSession()
    // const user:User =session?.user as User

  return (
    <nav className="p-4 md:p-6 shadow-md bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo */}
        <a href="/dashboad" className="text-2xl font-extrabold text-gray-900 mb-4 md:mb-0 hover:text-gray-600 transition duration-300 ease-in-out">
        Anonymous Message
        </a>

        {/* Right Side: Login / Logout */}
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              {/* Enhanced Welcome Message */}
              <div className="flex items-center text-gray-700 font-medium space-x-2">
                <FaUser className="text-indigo-600" /> {/* User Icon */}
                <span className="text-lg">Welcome, <span className="font-semibold">{session.user.username}</span>!</span> {/* Bold username */}
              </div>
              
              {/* Logout Button */}
              <Button
                onClick={() => signOut()}
                className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 rounded-lg px-6 py-3"
              >
                Logout
              </Button>
            </>
          ) : (
            // Login Button Link
            <Link href="/signin">
              <Button
                className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 rounded-lg px-6 py-3"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

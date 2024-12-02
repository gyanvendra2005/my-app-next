'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {  signOut, useSession } from 'next-auth/react'
// import { User } from 'next-auth'
// import {Button} from './ui/button'
import { FaBars, FaUser } from 'react-icons/fa';
import { FaHome, FaTachometerAlt, FaPaperPlane, FaCog } from 'react-icons/fa';
const Navbar = () => {

    const {data:session}= useSession()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // const user:User =session?.user as User
    // console.log(user);
    

  return (
    <nav className="p-4 md:p-6 shadow-md bg-white w-full">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/dashboard" className="text-sm font-extrabold text-blue-600 hover:text-blue-500 transition duration-300 ease-in-out md:text-lg">
          Anonymous Message
        </Link>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className=" hover:text-blue-500 transition duration-300"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Center: Navigation Links */}
        <div className={`md:flex md:flex-row md:space-x-6 space-y-4 md:space-y-0 absolute md:relative top-20 left-0 right-0 bg-white md:bg-transparent md:top-0 md:left-0 md:right-0 ${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          {/* Home Link with Icon */}
          <Link href="/" className="hover:text-blue-600 transition duration-300 flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
            <FaHome className="text-lg" />
            <span>Home</span>
          </Link>

          {/* Dashboard Link with Icon */}
          <Link href="/dashboard" className="hover:text-blue-600 transition duration-300 flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
            <FaTachometerAlt className="text-lg" />
            <span>Dashboard</span>
          </Link>

          {/* Send Messages Link with Icon */}
          <Link href={`/u/${session?.user.username}`} className="hover:text-blue-600 transition duration-300 flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
            <FaPaperPlane className="text-lg" />
            <span>Send Messages</span>
          </Link>

          {/* Settings Link with Icon */}
          <Link href="/settings" className="hover:text-blue-600 transition duration-300 flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
            <FaCog className="text-lg" />
            <span>Settings</span>
          </Link>
        </div>

        {/* Right Side: Login / Logout */}
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              {/* Enhanced Welcome Message */}
              <div className="flex items-center text-gray-700 font-medium space-x-2">
                <FaUser className="text-indigo-600" /> {/* User Icon */}
                <span className="text-lg">
                  Welcome, <span className="font-semibold">{session.user.username}</span>!
                </span> {/* Bold username */}
              </div>
              
              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 rounded-lg px-6 py-3 text-sm md:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            // Login Button Link
            <Link href="/signin">
              <button
                className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 rounded-lg px-6 py-3 text-sm md:text-base"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
   
)
}

export default Navbar

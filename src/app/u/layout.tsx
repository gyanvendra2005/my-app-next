import Navbar from '@/components/navbar';
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/sidebar"
import { FaFacebook } from "react-icons/fa";
// import messages from '@/messages.json';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import am from "../../../public/am.png"
import Image from 'next/image';
import Link from 'next/link';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />
        {children}
    </div>
     
    <footer className="bg-gray-900 text-white py-8">
  <div className="container mx-auto px-4 md:px-24">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      {/* Left Section: Logo and Text Content */}
      <div className="text-center md:text-left mb-4 md:mb-0">
        <Link href="/" className="flex justify-center md:justify-start">
          <picture>
            <Image
                src={am} 
                alt="Anonymous Message Logo"
                className="w-64  h-auto" 
                // width={128} 
                // height={auto} 
              />
          </picture>
         </Link>
        <p className="text-sm md:text-base mt-4">
          © 2024 Anonymous Message. All rights reserved.
        </p>
      </div>

      {/* Right Section: Links */}
      <div className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
        <Link href="/privacy" className="text-sm hover:text-gray-400">Privacy Policy</Link>
        <Link href="/terms" className="text-sm hover:text-gray-400">Terms of Service</Link>
        <Link href="/about" className="text-sm hover:text-gray-400">About Us</Link>
        <Link href="/contact" className="text-sm hover:text-gray-400">Contact Us</Link>
      </div>
    </div>

    {/* Social Media Icons */}
    <div className="flex justify-center space-x-6 mt-4">
      <Link href="https://facebook.com" className="text-gray-400 hover:text-white" aria-label="Facebook">
        <FaFacebook className="w-5 h-5" /> {/* FontAwesome Icon for Facebook */}
      </Link>
      <Link href="https://twitter.com" className="text-gray-400 hover:text-white" aria-label="Twitter">
        <FaXTwitter className="w-5 h-5" /> {/* FontAwesome Icon for Twitter */}
      </Link>
      <Link href="https://linkedin.com" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
        <FaLinkedin className="w-5 h-5" /> {/* FontAwesome Icon for LinkedIn */}
      </Link>
    </div>

  
  </div>
</footer>
    
    </>
  );
}
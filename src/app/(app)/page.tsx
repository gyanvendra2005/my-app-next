'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import { FaFacebook } from "react-icons/fa";
import messages from '@/messages.json';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      {/* Main content */}

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
    
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.recived}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      {/* <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2024 anonymous message. All rights reserved.
      </footer> */}
      {/* Footer */}
       {/* <footer className="bg-gray-900 text-white py-8">
  <div className="container mx-auto px-4 md:px-24">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">

      <div className="text-center md:text-left mb-4 md:mb-0">
        <a href="/" className="flex justify-center md:justify-start">
          <picture>
            <source srcSet="/img_webp/onwebchat-new-logo-white.webp" type="image/webp" />
            <source srcSet="/img/onwebchat-new-logo-white.png" type="image/png" />
            <img
              src="/img/onwebchat-new-logo-white.png"
              alt="Anonymous Message Logo"
              className="w-32 h-auto"
            />
          </picture>
        </a>
        <p className="text-sm md:text-base mt-4">
          © 2024 Anonymous Message. All rights reserved.
        </p>
      </div>

      <div className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
        <a href="/privacy" className="text-sm hover:text-gray-400">Privacy Policy</a>
        <a href="/terms" className="text-sm hover:text-gray-400">Terms of Service</a>
        <a href="/about" className="text-sm hover:text-gray-400">About Us</a>
        <a href="/contact" className="text-sm hover:text-gray-400">Contact Us</a>
      </div>
    </div>
    <div className="flex justify-center space-x-6 mt-4">
      <a href="https://facebook.com" className="text-gray-400 hover:text-white" aria-label="Facebook">
        <FaFacebook className="w-5 h-5" />
       </a>
      <a href="https://twitter.com" className="text-gray-400 hover:text-white" aria-label="Twitter">
        <FaXTwitter className="w-5 h-5" />
      </a>
      <a href="https://linkedin.com" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
        <FaLinkedin className="w-5 h-5" /> 
      </a>
    </div>

  
  </div>
</footer>   */}


    </>
  );
}

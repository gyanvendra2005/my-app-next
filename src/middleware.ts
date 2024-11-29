import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware" 
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {

    const token = await getToken({req:request})
    const url = request.nextUrl

    if(token&&
        (
            url.pathname.startsWith('/signin') ||
            url.pathname.startsWith('/signup') ||
            // url.pathname.startsWith('/') ||
            url.pathname.startsWith('/verify')
        )
    ){
        return NextResponse.redirect(new URL('/dashboad', request.url))
    }
    
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/',
    '/dasboad/:path*',
    '/verify/:path*'
  ]
}
import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    
    // Check if the route is an admin route
    if (pathname.startsWith('/dashboard') || pathname === '/login') {
        // Allow login page to be accessed
        if (pathname === '/login') {
            return NextResponse.next();
        }
        
        // For admin routes, check if user is authenticated
        // This is a basic check - in a real app, you'd verify the JWT token
        const token = request.cookies.get('admin_token')?.value;
        
        if (!token && pathname.startsWith('/dashboard')) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login']
};

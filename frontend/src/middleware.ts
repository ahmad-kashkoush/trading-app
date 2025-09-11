import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    
    // If user is authenticated and accessing auth pages
    if (token && (pathname === "/login" || pathname === "/signup")) {
      const isVerified = token.isVerified || token.provider === "github";
      if (isVerified) {
        // Only redirect verified users to dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      // Allow unverified users to access signup page (in case they want to use different email)
      // Only redirect unverified users from login page to verify-email
      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/verify-email", req.url));
      }
    }
    
    // Unauthenticated users accessing protected routes
    if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname === "/verify-email")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // GitHub accounts are considered verified by default
    const isVerified = token?.isVerified || token?.provider === "github";
    
    // Dashboard/Admin access control
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      if (!isVerified) return NextResponse.redirect(new URL("/verify-email", req.url));
      if (pathname.startsWith("/dashboard") && token?.role !== "user") return NextResponse.rewrite(new URL("/denied", req.url));
      if (pathname.startsWith("/admin") && token?.role !== "admin") return NextResponse.rewrite(new URL("/denied", req.url));
    }
    
    // Prevent GitHub users from accessing verify-email page
    if (pathname === "/verify-email" && token?.provider === "github") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to auth pages without token
        if (pathname.startsWith("/login") || 
            pathname.startsWith("/signup") || 
            pathname.startsWith("/verify-email")) {
          return true;
        }
        
        // Require token for protected routes
        return !!token;
      },
    },
  },
)

export const config = { 
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup", "/verify-email"] 
}
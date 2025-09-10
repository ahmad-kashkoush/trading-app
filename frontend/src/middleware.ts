import { CleaningServices } from "@mui/icons-material"
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequestWithAuth) {
    console.log("Middleware: ", req.nextauth.token);
    if(req.nextUrl.pathname.startsWith("/dashboard") && req.nextauth.token?.role !=='user') {
      return NextResponse.rewrite(new URL("/denied", req.url))
    }
    if(req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !=='admin') {
      return NextResponse.rewrite(new URL("/denied", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // verify we have token
    },
  },
)

export const config = { matcher: ["/dashboard"] }
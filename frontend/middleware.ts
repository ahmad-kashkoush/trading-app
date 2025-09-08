import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Configure which routes should be protected
export const config = {
  matcher: [
    // Protect all routes under /(protected) group
    "/dashboard/:path*",
    // Add other protected routes here as needed
    // "/admin/:path*",
    // "/profile/:path*",
  ],
};

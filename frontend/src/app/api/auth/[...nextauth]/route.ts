import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            profile(profile: GithubProfile) {
                return {
                    ...profile, 
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                    name: profile.name,
                    role: "user",
                }
            },
            // assertion (as type) is telling TS that you know better.
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: "post-verification", 
            name: "Post Verification",
            credentials: {
                token: { label: "Token", type: "text" },
                userData: { label: "User Data", type: "text" }
            },
            async authorize(credentials) {
                try {
                    if (credentials?.token && credentials?.userData) {
                        const userData = JSON.parse(credentials.userData);
                        
                        return {
                            id: userData._id,
                            name: userData.fullName,
                            email: userData.email,
                            role: userData.role || "user",
                            isVerified: true,
                            backendToken: credentials.token,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Post-verification auth error:", error);
                    return null;
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: { // Form fields
                username: { label: "Username:", type: "text", placeholder: "trade-username" },
                password: { label: "Password:", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Call our backend login API
                    const response = await fetch("http://localhost:5000/api/user/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.username,
                            password: credentials?.password,
                        }),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        // Return user object that will be saved in JWT
                        return {
                            id: result.user._id,
                            name: result.user.fullName,
                            email: result.user.email,
                            role: result.user.role || "user",
                            isVerified: result.user.isVerified,
                            backendToken: result.token, // Store our backend JWT token
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        }),
       
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.role = user.role;
                token.isVerified = user.isVerified;
                token.backendToken = user.backendToken;
            }
            return token;
        },
        async session({ session, token }) {
            if(session.user) {
                session.user.role = token.role;
                session.user.isVerified = token.isVerified;
                session.user.backendToken = token.backendToken;
            }
            return session;
        }
    }
}

const handler = NextAuth(options);

export { handler as GET, handler as POST };

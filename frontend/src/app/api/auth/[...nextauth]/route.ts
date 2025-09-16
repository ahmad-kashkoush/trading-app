import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import { apiAuth } from '@/services';
const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            async profile(profile: GithubProfile) {
                try {
                    // Map GitHub profile to database fields
                    const githubData = {
                        email: profile.email || '',
                        fullName: profile.name || profile.login,
                        password: `github_${profile.id}_temp`, // Temporary password for GitHub users
                    };

                    // Skip if email is not available
                    if (!profile.email) {
                        throw new Error('GitHub profile email is required');
                    }

                    // Use auth service for GitHub authentication
                    const loginResult = await apiAuth.githubAuth(githubData);

                    return {
                        id: loginResult.user._id,
                        name: loginResult.user.fullName,
                        email: loginResult.user.email,
                        image: profile.avatar_url,
                        role: loginResult.user.role || "user",
                        isVerified: true, // GitHub users are verified
                        backendToken: loginResult.token,
                    };
                } catch (error) {
                    console.error('GitHub auth error:', error);
                }

                // Fallback if API calls fail
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: "user",
                    isVerified: true,
                };
            },
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
                username: { label: "Username:", type: "text", placeholder: "your-username" },
                password: { label: "Password:", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Handle demo login specially
                    const demoUsername = process.env.DEMO_USERNAME || 'demo';
                    const demoPassword = process.env.DEMO_PASSWORD || 'demo123';
                    
                    if (credentials?.username === demoUsername && credentials?.password === demoPassword) {
                        return {
                            id: 'demo_user_id',
                            name: 'Demo User',
                            email: 'demo@example.com',
                            role: 'user',
                            isVerified: true,
                            backendToken: 'demo_token',
                        };
                    }

                    // Call our backend login API using auth service
                    if (credentials?.username && credentials?.password) {
                        const result = await apiAuth.login({
                            email: credentials.username,
                            password: credentials.password,
                        });

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
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if(user) {
                token.role = user.role;
                token.isVerified = user.isVerified;
                token.backendToken = user.backendToken;
            }
            // Track the provider used for login
            if(account) {
                token.provider = account.provider;
            }
            return token;
        },
        async session({ session, token }) {
            if(session.user) {
                session.user.role = token.role;
                session.user.isVerified = token.isVerified;
                session.user.backendToken = token.backendToken;
                session.user.provider = token.provider;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // GitHub users and verified users go to dashboard
            if (url.includes('github') || url.includes('dashboard')) {
                return `${baseUrl}/dashboard`;
            }
            // Default redirect for other cases
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            if (new URL(url).origin === baseUrl) return url;
            return `${baseUrl}/dashboard`;
        }
    }
}

const handler = NextAuth(options);

export { handler as GET, handler as POST };

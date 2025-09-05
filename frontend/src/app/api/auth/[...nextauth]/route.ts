import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            // assertion (as type) is telling TS that you know better.
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: { // Form fields
                username: { label: "Username:", type: "text", placeholder: "trade-username" },
                password: { label: "Password:", type: "password" },
            },
            async authorize(credentials) {
                // left for now
                const userToPass = {
                    id: "1",
                    name: "user-to-pass", 
                    email: "user-to-pass@gmail.com"
                };
                if(credentials?.username === "user-to-pass" && credentials?.password === "123") {
                    return userToPass;
                }
                return null;
            }
    }),
       
    ],
}

const handler = NextAuth(options);

export { handler as GET, handler as POST };

//  Source: https://next-auth.js.org/getting-started/typescript#module-augmentation
import NextAuth from "next-auth";
import {DefaultSession, DefaultUser} from "next-auth";
import {JWT, DefaultJWT} from "next-auth/jwt";

// These will fix type erros in callbacks in route.ts
declare module "next-auth" {
    interface Session {
        user: {
            role: string;
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        } & DefaultSession["user"]
    }
    interface User extends DefaultUser{
        role: string;
    }
}
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string;
    }
}
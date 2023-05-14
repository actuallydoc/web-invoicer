import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import jwt from "jsonwebtoken"
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
        //Just add providers here if you need more!
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string,
    }),
    secret: process.env.JWT_SECRET,

})
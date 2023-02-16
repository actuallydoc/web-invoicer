// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "@/db/client";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<login_response>
) {

    const {username, email , password} = req.body;
    if(req.method != "POST") {
        return res.status(405).json({message: "Method not allowed"});
    };
    if (!username || !email || !password) {
        return res.status(400).json({error: "Missing fields"});
    }
    if (password.length < 8) {
        return res.status(400).json({error: "Password too short"});
    }
    try {

        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
            }
        });
        console.log(user);
        return res.status(200).json({
            message: "User created"
        });
    }
    catch (e) {
        // @ts-ignore
        if (e.code === "P2002") {
            return res.status(400).json({error: "Username or email already exists"});
        }
        return res.status(500).json({error: "Internal server error"});
    }
    console.log(username,email, password);



    res.status(200).json({token: "John Doe"});
}

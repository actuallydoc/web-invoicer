import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<login_response>
) {

    return res.status(200).json({ token: "Create customer endpoint" });

}
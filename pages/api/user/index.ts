import type { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2/promise';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<login_response>
) {
    const { method } = req;

    if (!(method === "GET")) {
        return res.status(400).json({ message: "Only GET requests allowed" });
    }

    return res.status(200).json({ token: "Create customer endpoint" });

}
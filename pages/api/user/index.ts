import type { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2/promise';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, data } = req;
    console.log("session", data.session);
    if (!(method === "GET")) {
        return res.status(400).json({ message: "Only GET requests allowed" });
    }

    return res.status(200).json({ token: "Get user data endpoint" });

}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { dbconnecton } from "@/db/client";
import bcrypt from "bcrypt";
import mysql from 'mysql2/promise';
const saltRounds = 10;
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<login_response>
) {
    //Test the connection to the database
    const dbconnection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webinvoicer'
    });
    //!TODO Add more security checks
    let { name, email, password, city, phone, address, country, postalCode } = req.body;
    if (req.method != "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    };
    if (!name || !email || !password || !city || !phone || !address || !country || !postalCode) {
        return res.status(400).json({ error: "Missing fields" });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "Password too short" });
    }
    //Check for duplicates
    const [emailRows, columns] = await dbconnection.execute("SELECT * FROM User WHERE email = ?", [email],);
    // console.log(emailRows); //This returns ROWS aka data from the database that matches the query

    if (Array.isArray(emailRows) && emailRows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
    }
    const [nameRows, columns2] = await dbconnection.execute("SELECT * FROM User WHERE name = ?", [name],);
    if (Array.isArray(nameRows) && nameRows.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
    }
    try {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            //Query for inserting the user into the database after hashing the password and checking for duplicates and everything
            const query = "INSERT INTO User (name, email,password ,phone, address, city, country, postalCode) VALUES (?,?,?,?,?,?,?,?)"
            const values = [name, email, hash, phone, address, city, country, postalCode]
            console.log(hash);
            // console.log(password)
            const [result] = await dbconnection.execute(query, values);
            // console.log(result);
        });
        //Return success and make them go to login page
        return res.status(200).json({ message: "User created" });
    }

    catch (e) {
        // @ts-ignore
        if (e.code === "P2002") {
            return res.status(400).json({ error: "Username or email already exists" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }

}

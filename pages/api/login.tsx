// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mysql, { RowDataPacket } from "mysql2/promise";
import bcrypt from "bcrypt";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  };
  let { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const dbconnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webinvoicer'
  });
  const [nameRows, fields] = await dbconnection.execute("SELECT * FROM User WHERE name = ?", [name]);
  if (Array.isArray(nameRows) && nameRows.length > 0) {
    // console.log(nameRows[0].password); // This gets the hashed password now you should compare it with the password from the request
    let hashCheck = await bcrypt.compare(password, nameRows[0].password);
    dbconnection.end();
    if (!hashCheck) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!hashCheck) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {

      delete nameRows[0].password;
      return res.status(200).json({ message: nameRows[0] });

    }

  }
  dbconnection.end();
}

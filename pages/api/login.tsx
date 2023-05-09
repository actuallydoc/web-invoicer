// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";
import bcrypt from "bcrypt";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<login_response>
) {

  const { username, password } = req.body;
  console.log(username, password);
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  //Bcrypt it back to the original password
  let decrypted = user.password = await bcrypt.hash(password, 10);
  if (!decrypted) {
    return res.status(500).json({ error: "Internal server error" });
  }
  if (decrypted != user.password) {
    return res.status(400).json({ error: "Incorrect password" });
  }
  console.log(user);
  //For now just return the user and all of its data
  return res.status(200).json({ user: user });
}

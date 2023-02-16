// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "@/db/client";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<login_response>
) {

  const {username, password} = req.body;
  console.log(username, password);
  //const user = await prisma.user.findUnique({
  //  where: {
  //    email: email
  //  }
  //});


  res.status(200).json({token: "John Doe"});
}

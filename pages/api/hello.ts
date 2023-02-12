// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //Check if the request is a POST request
  //Check if there is data in the request body
  //Check if the data in the request body is valid
  //Check if the user is in the database
  //Check if the password is correct
  //Verify the user
  //Send the response with the user data and the token
  res.status(200).json({ name: 'John Doe' })
}

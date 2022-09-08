import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(405)
  res.end(`Method ${req.method} Not Allowed`)
}

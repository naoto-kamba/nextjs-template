import { NextApiRequest, NextApiResponse } from 'next'
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const body = {
    message: 'Hello, World!',
  }
  res.status(200).json(body)
}

export default handler

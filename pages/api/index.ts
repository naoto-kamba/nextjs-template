import { NextApiRequest, NextApiResponse } from 'next'
import { DB } from '../../foundation/db'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const result = await DB.select()
  const body = {
    message: 'Hello, World!',
    result: result.rows,
  }
  res.status(200).json(body)
}

export default handler

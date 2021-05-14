import { NextApiRequest, NextApiResponse } from 'next'
import { DB } from '../../foundation/db'
type User = {
  userId: string
  email: string
  password: string
  deleteFlag: string
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const sql = `
SELECT
  user_id,
  email,
  password,
  delete_flag
FROM
  tbm_user
`
  const result = await DB.select<User>(sql)
  const body = {
    message: 'Hello, World!',
    result: result,
  }
  res.status(200).json(body)
}

export default handler

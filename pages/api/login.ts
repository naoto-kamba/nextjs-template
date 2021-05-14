import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'
import { DB } from '../../foundation/db'
import { withSession } from '../../foundation/session'
type LoginRequestBody = {
  userId: string
  password: string
}

type User = {
  userId: string
  email: string
  password: string
  deleteFlag: string
}
const handler = async (
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    const userId = req.session.get('userId')
    if (typeof userId === 'undefined') {
      res.status(200).json({
        messages: ['現在ログインしていません。'],
      })
    }
    const sql = `
    SELECT
      user_id,
      email,
      password,
      delete_flag
    FROM
      tbm_user
    WHERE
      user_id = '${userId}'
    `
    const result = await DB.select<User>(sql)
    if (result.length > 0) {
      const record = result[0]
      res.status(200).json({
        userId: record.userId,
        email: record.email,
      })
    } else {
      res.status(401).end()
    }
  } else if (req.method === 'POST') {
    const { userId } = req.body as LoginRequestBody
    req.session.set('userId', userId)
    const responseBody = {
      messages: ['ログインに成功しました。'],
    }
    await req.session.save()
    res.status(200).json(responseBody)
  }
}

export default withSession(handler)

import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'
import { DB } from '../../lib/api/db'
import { withSession } from '../../middlewares/session'
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
      return
    } else {
      res.status(401).end()
      return
    }
  } else if (req.method === 'POST') {
    const { userId, password } = req.body as LoginRequestBody
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password, 'utf8')
      .digest('hex')
    const sql = `
      SELECT
        password
      FROM
        tbm_user
      WHERE
        user_id = '${userId}'
      `
    const result = await DB.select<{ password: string }>(sql)
    if (result.length === 0) {
      res.status(401).end()
      return
    }
    const storedPassword = result[0].password
    if (storedPassword === hashedPassword) {
      req.session.set('userId', userId)
      await req.session.save()
      res.status(200).json({
        messages: ['ログインに成功しました。'],
      })
    } else {
      res.status(401).end()
    }
  }
}

export default withSession(handler)

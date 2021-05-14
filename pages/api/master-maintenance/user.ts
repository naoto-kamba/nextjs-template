import { DB } from '../../../lib/api/db'
import { withAuthorizationGroup } from '../../../middlewares/middleware-group'
import { Handler } from '../../../types'

type User = {
  userId: string
  email: string
  password: string
  deleteFlag: string
}

const handler: Handler = async (req, res) => {
  if (req.method === 'GET') {
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
    res.status(200).json({
      data: result,
      messages: ['データの取得に成功しました。'],
    })
  }
}

export default withAuthorizationGroup(handler)

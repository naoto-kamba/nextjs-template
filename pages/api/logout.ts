import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'
import { withSession } from '../../foundation/session'

const handler = async (
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    req.session.destroy()
    await req.session.save()
    res.status(200).json({
      messages: ['ログアウトに成功しました。'],
    })
  }
}

export default withSession(handler)

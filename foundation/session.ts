import { NextApiRequest, NextApiResponse } from 'next'
import { Session, withIronSession } from 'next-iron-session'

export const withSession = (
  handler: (
    req: NextApiRequest & { session: Session },
    res: NextApiResponse
  ) => Promise<void>
) => {
  return withIronSession(handler, {
    password: 'cookie-password-hogehogehogehogehogehogehogehoge',
    cookieName: 'next.js/examples/with-iron-session',
    cookieOptions: {
      secure: false,
    },
  })
}

import { withIronSession } from 'next-iron-session'
import { Handler } from '../types'

export const withSession = (handler: Handler) => {
  return withIronSession(handler, {
    password: 'cookie-password-hogehogehogehogehogehogehogehoge',
    cookieName: 'next.js/examples/with-iron-session',
    cookieOptions: {
      secure: false,
    },
  })
}

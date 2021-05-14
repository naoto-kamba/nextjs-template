import { Handler } from '../types'
import { withAuthorization } from './authorization'
import { withSession } from './session'

export const withAuthorizationGroup = (handler: Handler) => {
  return withSession(withAuthorization(handler))
}

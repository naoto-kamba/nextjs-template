import { ApiRequest, ApiResponse, Handler } from '../types'

export const withAuthorization = (handler: Handler): Handler => {
  return async (req: ApiRequest, res: ApiResponse) => {
    const userId = req.session.get('userId')
    if (typeof userId === 'undefined') {
      res.status(401).end()
    } else {
      return handler(req, res)
    }
  }
}

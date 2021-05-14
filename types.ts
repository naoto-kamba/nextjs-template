import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'

export type ApiRequest = NextApiRequest & { session: Session }

export type ApiResponse = NextApiResponse

export type Handler = (req: ApiRequest, res: ApiResponse) => Promise<void>

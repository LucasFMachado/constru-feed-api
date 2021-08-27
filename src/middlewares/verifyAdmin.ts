import { Request, Response, NextFunction } from 'express'
import { errorMessage } from '../functions/returnMessages'

export default function verifyAdmin (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_admin } = request

  if (user_admin) {
    return next()
  }

  return errorMessage({
    response: response,
    code: 401,
    message: 'User unauthorized!'
  })
}

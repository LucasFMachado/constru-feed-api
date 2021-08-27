import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { errorMessage } from '../functions/returnMessages'

interface IPayload {
  id: number
  name: string,
  email: string,
  admin: boolean,
}

export default function verifySession (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return errorMessage({
      response: response,
      code: 401,
      message: 'Token missing!'
    })
  }

  const [, token] = authToken.split(' ')

  try {
    const { id, name, email, admin } = verify(token, '88f332bc8f6556e45e3735d7685f9e93') as IPayload

    request.user_id = id
    request.user_name = name
    request.user_email = email
    request.user_admin = admin

    return next()
  } catch (error) {
    return errorMessage({
      response: response,
      code: 401,
      message: 'Token is invalid!'
    })
  }
}

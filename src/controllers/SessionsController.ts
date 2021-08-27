import { Request, Response } from 'express'
import SessionsService from '../services/SessionsService'
import { successMessage } from '../functions/returnMessages'

class SessionsController {
  async create (request: Request, response: Response) {
    const { email, password } = request.body
    const sessionsService = new SessionsService()
    const token = await sessionsService.authenticate({ email, password })
    return successMessage({ response, data: token })
  }
}

export default SessionsController

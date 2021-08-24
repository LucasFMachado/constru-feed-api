import { Request, Response } from 'express'
import UsersService from '../services/UsersService'
import { successMessage } from '../functions/returnMessages'

class UsersController {
  async create (request: Request, response: Response) {
    const { name, email, password, admin } = request.body
    const usersService = new UsersService()
    const user = await usersService.create({ name, email, password, admin })
    return successMessage({ response, data: user })
  }

  async update (request: Request, response: Response) {
    const id = Number(request.params.id)
    const { name, email, password, blocked, active, admin } = request.body
    const usersService = new UsersService()
    const user = await usersService.update({ id, name, email, password, blocked, active, admin })
    return successMessage({ response, data: user })
  }

  async delete (request: Request, response: Response) {
    const id = Number(request.params.id)
    const usersService = new UsersService()
    const user = await usersService.delete({ id })
    return successMessage({ response, data: user })
  }
}

export default UsersController

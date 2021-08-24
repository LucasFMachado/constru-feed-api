import { Request, Response } from 'express'
import ComplaintTypesService from '../services/ComplaintTypesService'
import { successMessage } from '../functions/returnMessages'

class ComplaintTypesController {
  async create (request: Request, response: Response) {
    const { name } = request.body
    const complaintTypesService = new ComplaintTypesService()
    const tag = await complaintTypesService.create({ name })
    return successMessage({ response, data: tag })
  }

  async update (request: Request, response: Response) {
    const id = Number(request.params.id)
    const { name, active } = request.body
    const complaintTypesService = new ComplaintTypesService()
    const tag = await complaintTypesService.update({ id, name, active })
    return successMessage({ response, data: tag })
  }

  async delete (request: Request, response: Response) {
    const id = Number(request.params.id)
    const complaintTypesService = new ComplaintTypesService()
    const tag = await complaintTypesService.delete({ id })
    return successMessage({ response, data: tag })
  }
}

export default ComplaintTypesController

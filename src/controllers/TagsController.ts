import { Request, Response } from 'express'
import TagsService from '../services/TagsService'
import { successMessage } from '../functions/returnMessages'

class TagsController {
  async create (request: Request, response: Response) {
    const { name } = request.body
    const tagsService = new TagsService()
    const tag = await tagsService.create({ name })
    return successMessage({ response, data: tag })
  }

  async update (request: Request, response: Response) {
    const id = Number(request.params.id)
    const { name, active } = request.body
    const tagsService = new TagsService()
    const tag = await tagsService.update({ id, name, active })
    return successMessage({ response, data: tag })
  }

  async delete (request: Request, response: Response) {
    const id = Number(request.params.id)
    const tagsService = new TagsService()
    const tag = await tagsService.delete({ id })
    return successMessage({ response, data: tag })
  }
}

export default TagsController

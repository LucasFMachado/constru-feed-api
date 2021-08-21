import { getCustomRepository } from 'typeorm'
import TagsRepository from '../repositories/TagsRepository'

interface ICreateTagsRequest {
  name: string
}

class TagsService {
  async create ({ name }: ICreateTagsRequest) {
    const tagsRepository = getCustomRepository(TagsRepository)

    if (!name) {
      throw new Error('Name Incorrect!')
    }

    const tagAlreadyExists = await tagsRepository.findOne({
      name
    })

    if (tagAlreadyExists) {
      throw new Error('Tag already exists!')
    }

    const tag = tagsRepository.create({
      name
    })

    await tagsRepository.save(tag)

    return tag
  }
}

export default TagsService

import { getCustomRepository } from 'typeorm'
import TagsRepository from '../repositories/TagsRepository'

interface ICreateTagsRequest {
  name: string
}

interface IUpdateTagRequest {
  id: number,
  name: string,
  active: boolean
}

interface IDeleteTagRequest {
  id: number
}

class TagsService {
  async create ({ name }: ICreateTagsRequest) {
    const tagsRepository = getCustomRepository(TagsRepository)

    if (!name) {
      throw new Error('Name incorrect!')
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

  async update ({ id, name, active }: IUpdateTagRequest) {
    const tagsRepository = getCustomRepository(TagsRepository)

    if (!id) {
      throw new Error('Tag incorrect!')
    }

    if (!name) {
      throw new Error('Name incorrect!')
    }

    const tag = await tagsRepository.findOne({ id })

    if (!tag) {
      throw new Error('Tag does not exists!')
    }

    const newTag = {
      ...tag,
      name: name,
      active: active
    }

    tagsRepository.update(id, newTag)

    await tagsRepository.save(newTag)

    return newTag
  }

  async delete ({ id } :IDeleteTagRequest) {
    const tagsRepository = getCustomRepository(TagsRepository)

    if (!id) {
      throw new Error('Tag incorrect!')
    }

    const tag = await tagsRepository.findOne({ id })

    if (!tag) {
      throw new Error('Tag does not exists!')
    }

    const deletedTag = {
      ...tag,
      deleted: true
    }

    tagsRepository.update(id, deletedTag)

    await tagsRepository.save(deletedTag)

    return deletedTag
  }
}

export default TagsService

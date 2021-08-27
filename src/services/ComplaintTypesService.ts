import { getCustomRepository } from 'typeorm'
import ComplaintTypesRepository from '../repositories/ComplaintTypesRepository'

interface ICreateComplaintTypesRequest {
  name: string
}

interface IUpdateComplaintTypesRequest {
  id: number,
  name: string,
  active: boolean
}

interface IDeleteComplaintTypesRequest {
  id: number
}

class ComplaintTypesService {
  async create ({ name }: ICreateComplaintTypesRequest) {
    const complaintTypesRepository = getCustomRepository(ComplaintTypesRepository)

    if (!name) {
      throw new Error('Name incorrect!')
    }

    const tagAlreadyExists = await complaintTypesRepository.findOne({
      name
    })

    if (tagAlreadyExists) {
      throw new Error('Tag already exists!')
    }

    const tag = complaintTypesRepository.create({
      name
    })

    await complaintTypesRepository.save(tag)

    return tag
  }

  async update ({ id, name, active }: IUpdateComplaintTypesRequest) {
    const complaintTypesRepository = getCustomRepository(ComplaintTypesRepository)

    if (!id) {
      throw new Error('Tag incorrect!')
    }

    if (!name) {
      throw new Error('Name incorrect!')
    }

    const tag = await complaintTypesRepository.findOne({ id })

    if (!tag) {
      throw new Error('Tag does not exists!')
    }

    const newTag = {
      ...tag,
      name,
      active
    }

    complaintTypesRepository.update(id, newTag)

    await complaintTypesRepository.save(newTag)

    return newTag
  }

  async delete ({ id }: IDeleteComplaintTypesRequest) {
    const complaintTypesRepository = getCustomRepository(ComplaintTypesRepository)

    if (!id) {
      throw new Error('Tag incorrect!')
    }

    const tag = await complaintTypesRepository.findOne({ id })

    if (!tag) {
      throw new Error('Tag does not exists!')
    }

    const deletedTag = {
      ...tag,
      deleted: true
    }

    complaintTypesRepository.update(id, deletedTag)

    await complaintTypesRepository.save(deletedTag)

    return deletedTag
  }
}

export default ComplaintTypesService

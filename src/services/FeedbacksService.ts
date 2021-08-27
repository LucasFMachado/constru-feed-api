import { getCustomRepository } from 'typeorm'
import FeedbacksRepository from '../repositories/FeedbacksRepository'
import TagsRepository from '../repositories/TagsRepository'
import UsersRepository from '../repositories/UsersRepository'

interface ICreateFeedbacksRequest {
  sender_id: number,
  receiver_id: number,
  tag_id: number,
  message: string,
  anonymous: boolean,
}

class FeedbacksService {
  async create ({ sender_id, receiver_id, tag_id, message, anonymous }: ICreateFeedbacksRequest) {
    const tagsRepository = getCustomRepository(TagsRepository)
    const usersRepository = getCustomRepository(UsersRepository)
    const feedbacksRepository = getCustomRepository(FeedbacksRepository)

    if (!message) {
      throw new Error('Messagae incorrect!')
    }

    if (sender_id === receiver_id) {
      throw new Error('Incorrect user receiver!')
    }

    const userReceiverExists = await usersRepository.findOne(receiver_id)

    if (!userReceiverExists) {
      throw new Error('User receiver does not exists!')
    }

    const tagExists = await tagsRepository.findOne(tag_id)

    if (!tagExists) {
      throw new Error('Tag does not exists!')
    }

    const feedback = feedbacksRepository.create({
      sender_id,
      receiver_id,
      tag_id,
      message,
      anonymous
    })

    await feedbacksRepository.save(feedback)

    return feedback
  }
}

export default FeedbacksService

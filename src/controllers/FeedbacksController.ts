import { Request, Response } from 'express'
import FeedbacksService from '../services/FeedbacksService'
import { successMessage } from '../functions/returnMessages'

class FeedbacksController {
  async create (request: Request, response: Response) {
    const { user_id } = request
    const {
      receiver_id,
      tag_id,
      message,
      anonymous
    } = request.body
    const feedbacksService = new FeedbacksService()
    const feedback = await feedbacksService.create({
      sender_id: user_id,
      receiver_id,
      tag_id,
      message,
      anonymous
    })
    return successMessage({ response, data: feedback })
  }
}

export default FeedbacksController

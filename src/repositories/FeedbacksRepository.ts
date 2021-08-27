import { EntityRepository, Repository } from 'typeorm'
import Feedbacks from '../entities/Feedbacks'

@EntityRepository(Feedbacks)
class FeedbacksRepository extends Repository<Feedbacks> { }

export default FeedbacksRepository

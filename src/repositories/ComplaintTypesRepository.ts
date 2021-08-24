import { EntityRepository, Repository } from 'typeorm'
import ComplaintTypes from '../entities/ComplaintTypes'

@EntityRepository(ComplaintTypes)
class ComplaintTypesRepository extends Repository<ComplaintTypes> { }

export default ComplaintTypesRepository

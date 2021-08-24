import { Router } from 'express'
import TagsController from './controllers/TagsController'
import UsersController from './controllers/UsersController'
import ComplaintTypesController from './controllers/ComplaintTypesController'

const router = Router()

const tagsController = new TagsController()
const usersController = new UsersController()
const complaintTypesController = new ComplaintTypesController()

router.post('/tags', tagsController.create)
router.put('/tags/:id', tagsController.update)
router.delete('/tags/:id', tagsController.delete)

router.post('/users', usersController.create)
router.put('/users/:id', usersController.update)
router.delete('/users/:id', usersController.delete)

router.post('/complaint_types', complaintTypesController.create)
router.put('/complaint_types/:id', complaintTypesController.update)
router.delete('/complaint_types/:id', complaintTypesController.delete)

export { router }

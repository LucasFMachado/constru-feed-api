import { Router } from 'express'
import verifySession from './middlewares/verifySession'
import verifyAdmin from './middlewares/verifyAdmin'
import TagsController from './controllers/TagsController'
import UsersController from './controllers/UsersController'
import ComplaintTypesController from './controllers/ComplaintTypesController'
import FeedbacksController from './controllers/FeedbacksController'
import SessionsController from './controllers/SessionsController'

const router = Router()

const sessionsController = new SessionsController()
const tagsController = new TagsController()
const usersController = new UsersController()
const complaintTypesController = new ComplaintTypesController()
const feedbacksController = new FeedbacksController()

router.post('/sessions', sessionsController.create)

router.post('/tags', verifySession, verifyAdmin, tagsController.create)
router.put('/tags/:id', verifySession, verifyAdmin, tagsController.update)
router.delete('/tags/:id', verifySession, verifyAdmin, tagsController.delete)

router.post('/complaint_types', verifySession, verifyAdmin, complaintTypesController.create)
router.put('/complaint_types/:id', verifySession, verifyAdmin, complaintTypesController.update)
router.delete('/complaint_types/:id', verifySession, verifyAdmin, complaintTypesController.delete)

router.post('/users', verifySession, verifyAdmin, usersController.create)
router.put('/users/:id', verifySession, verifyAdmin, usersController.update)
router.delete('/users/:id', verifySession, verifyAdmin, usersController.delete)

router.post('/feedbacks', verifySession, feedbacksController.create)

export { router }

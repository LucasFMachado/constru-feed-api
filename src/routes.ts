import { Router } from 'express'
import TagsController from './controllers/TagsController'

const router = Router()

const tagsController = new TagsController()

router.post('/tags', tagsController.create)
router.put('/tags/:id', tagsController.update)
router.delete('/tags/:id', tagsController.delete)

export { router }

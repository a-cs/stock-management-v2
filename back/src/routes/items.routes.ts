import { Router } from 'express'
import ItemController from '../controllers/ItemController'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'

const itemsRouter = Router()
itemsRouter.use(ensureUserIsAuthenticated)

const itemController = new ItemController()

itemsRouter.get('/', itemController.getAllitems)
itemsRouter.post('/', itemController.createitem)
itemsRouter.patch('/:id', itemController.updateitem)
// itemsRouter.delete('/:id', itemController.deleteUnit)

export default itemsRouter

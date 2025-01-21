import { Router } from 'express'
import ItemController from '../controllers/ItemController'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'

const itemsRouter = Router()
itemsRouter.use(ensureUserIsAuthenticated)

const itemController = new ItemController()

itemsRouter.get('/', itemController.getAllItems)
itemsRouter.get('/ordered', itemController.getAllItemsOrdered)
itemsRouter.post('/', itemController.createItem)
itemsRouter.patch('/:id', itemController.updateItem)
// itemsRouter.delete('/:id', itemController.deleteUnit)

export default itemsRouter

import { Router } from 'express'
import ItemController from '../controllers/ItemController'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'
import ensureUserIsAllowed from '../middlewares/ensureUserIsAllowed'

const itemsRouter = Router()
itemsRouter.use(ensureUserIsAuthenticated)
itemsRouter.use(ensureUserIsAllowed)

const itemController = new ItemController()

itemsRouter.get('/', itemController.getAllItems)
itemsRouter.get('/ordered', itemController.getAllItemsOrdered)
itemsRouter.post('/', itemController.createItem)
itemsRouter.patch('/:id', itemController.updateItem)

export default itemsRouter

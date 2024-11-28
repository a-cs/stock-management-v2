import { Router } from 'express'
import UnitController from '../controllers/UnitController'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'

const unitsRouter = Router()
unitsRouter.use(ensureUserIsAuthenticated)

const unitController = new UnitController()

unitsRouter.get('/', unitController.getAllUnits)
unitsRouter.post('/', unitController.createUnit)
unitsRouter.patch('/:id', unitController.updateUnit)
// unitsRouter.delete('/:id', unitController.deleteUnit)

export default unitsRouter

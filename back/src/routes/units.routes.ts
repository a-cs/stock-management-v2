import { Router } from 'express'
import UnitController from '../controllers/UnitController'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'
import ensureUserIsAllowed from '../middlewares/ensureUserIsAllowed'

const unitsRouter = Router()
unitsRouter.use(ensureUserIsAuthenticated)
unitsRouter.use(ensureUserIsAllowed)

const unitController = new UnitController()

unitsRouter.get('/', unitController.getAllUnits)
unitsRouter.post('/', unitController.createUnit)
unitsRouter.patch('/:id', unitController.updateUnit)

export default unitsRouter

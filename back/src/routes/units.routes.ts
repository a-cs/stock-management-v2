import { Router } from 'express'
import UnitController from '../controllers/UnitController'

const categoriesRouter = Router()
const unitController = new UnitController()

categoriesRouter.get('/', unitController.getAllUnits)
categoriesRouter.post('/', unitController.createUnit)
categoriesRouter.patch('/:id', unitController.updateUnit)
categoriesRouter.delete('/:id', unitController.deleteUnit)

export default categoriesRouter

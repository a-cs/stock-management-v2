import { Router } from 'express'
import CategoryController from '../controllers/CategoryController'

const categoriesRouter = Router()
const categoryController = new CategoryController()

categoriesRouter.get('/', categoryController.getAllCategories)
categoriesRouter.post('/', categoryController.createCategory)
categoriesRouter.patch('/:id', categoryController.updateCategory)
categoriesRouter.delete('/:id', categoryController.deleteCategory)

export default categoriesRouter

import { Router } from 'express'
import UserController from '../controllers/UserController'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'

const usersRouter = Router()
const userController = new UserController()

usersRouter.post('/', userController.createUser)
usersRouter.use(ensureUserIsAuthenticated)
usersRouter.get('/', userController.getAllUsers)

export default usersRouter

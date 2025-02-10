import { Router } from 'express'
import UserController from '../controllers/UserController'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'
import ensureUserIsAllowed from '../middlewares/ensureUserIsAllowed'

const usersRouter = Router()
const userController = new UserController()

usersRouter.post('/', userController.createUser)

usersRouter.use(ensureUserIsAuthenticated)
usersRouter.get('/me', userController.getMyUser)

usersRouter.use(ensureUserIsAllowed)
usersRouter.get('/', userController.getAllUsers)

export default usersRouter

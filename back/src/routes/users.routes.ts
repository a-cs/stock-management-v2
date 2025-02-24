import { Router } from 'express'
import UserController from '../controllers/UserController'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'
import ensureUserIsAllowed from '../middlewares/ensureUserIsAllowed'
import ensureUserIsAdmin from '../middlewares/ensureUserIsAdmin'

const usersRouter = Router()
const userController = new UserController()

usersRouter.post('/', userController.createUser)
usersRouter.post('/forgot-password', userController.forgotPassword)
usersRouter.post('/reset-password', userController.resetPassword)

usersRouter.use(ensureUserIsAuthenticated)
usersRouter.get('/me', userController.getMyUser)
usersRouter.put('/password', userController.updateUserPassword)

usersRouter.use(ensureUserIsAllowed)
usersRouter.use(ensureUserIsAdmin)
usersRouter.get('/', userController.getUsersPaginated)
usersRouter.patch('/:id', userController.updateUserPermissions)

export default usersRouter

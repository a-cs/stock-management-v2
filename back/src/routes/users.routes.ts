import { Router } from 'express'
import UserController from '../controllers/UserController'

const usersRouter = Router()
const userController = new UserController()

usersRouter.get('/', userController.getAllUsers)
usersRouter.post('/', userController.createUser)

export default usersRouter

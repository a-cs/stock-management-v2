import { Router } from 'express'
import AuthController from '../controllers/AuthController'

const sessionsRouter = Router()
const authController = new AuthController()

sessionsRouter.post('/', authController.authSession)

export default sessionsRouter

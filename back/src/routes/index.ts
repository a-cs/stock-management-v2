import { Router } from 'express'
import usersRouter from './users.routes'
import categoriesRouter from './categories.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/categories', categoriesRouter)

export default routes

import { Router } from 'express'
import usersRouter from './users.routes'
import unitsRouter from './units.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/units', unitsRouter)

export default routes

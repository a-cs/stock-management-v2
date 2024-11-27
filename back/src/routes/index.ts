import { Router } from 'express'
import usersRouter from './users.routes'
import unitsRouter from './units.routes'
import sessionsRouter from './sesions.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/units', unitsRouter)
routes.use('/sessions', sessionsRouter)

export default routes

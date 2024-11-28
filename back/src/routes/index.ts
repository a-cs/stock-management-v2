import { Router } from 'express'
import usersRouter from './users.routes'
import unitsRouter from './units.routes'
import sessionsRouter from './sessions.routes'
import itemsRouter from './items.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/units', unitsRouter)
routes.use('/items', itemsRouter)
routes.use('/sessions', sessionsRouter)

export default routes

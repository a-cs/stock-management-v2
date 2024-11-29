import { Router } from 'express'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'
import TransactionController from '../controllers/TransactionController'

const transactionsRouter = Router()
transactionsRouter.use(ensureUserIsAuthenticated)

const transactionController = new TransactionController()

transactionsRouter.get('/', transactionController.getAllitems)
transactionsRouter.post('/', transactionController.createitem)

export default transactionsRouter

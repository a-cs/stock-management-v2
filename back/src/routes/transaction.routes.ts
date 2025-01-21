import { Router } from 'express'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'
import TransactionController from '../controllers/TransactionController'

const transactionsRouter = Router()
transactionsRouter.use(ensureUserIsAuthenticated)

const transactionController = new TransactionController()

transactionsRouter.get('/', transactionController.getAllTransactions)
transactionsRouter.post('/', transactionController.createTransactions)

export default transactionsRouter

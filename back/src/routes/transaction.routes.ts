import { Router } from 'express'
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated'
import TransactionController from '../controllers/TransactionController'
import ensureUserIsAllowed from '../middlewares/ensureUserIsAllowed'

const transactionsRouter = Router()
transactionsRouter.use(ensureUserIsAuthenticated)
transactionsRouter.use(ensureUserIsAllowed)

const transactionController = new TransactionController()

transactionsRouter.get('/', transactionController.getAllTransactions)
transactionsRouter.post('/', transactionController.createTransactions)

export default transactionsRouter

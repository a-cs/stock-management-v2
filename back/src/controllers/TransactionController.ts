/* eslint-disable camelcase */
import { Request, Response } from 'express'
import TransactionService from '../services/TransactionService'
import { ZodError } from 'zod'
import AppError from '../errors/AppError'
import { CreateTransactionSchema } from '../schemas/transactions/CreateTransactionSchema'

export default class TransactionController {
    private transactionService: TransactionService

    constructor() {
        this.transactionService = new TransactionService()
    }

    public getAllitems = async (req: Request, res: Response) => {
        const transaction = await this.transactionService.getAllTransactions()
        res.status(200).json(transaction)
    }

    public createitem = async (req: Request, res: Response) => {
        try {
            const { id: idAsString } = req.user
            const user_id = Number(idAsString)
            const data = { ...req.body, user_id }
            const validatedData = CreateTransactionSchema.parse(data)
            await this.transactionService.createTransaction(validatedData)
            res.status(201).send()
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.errors.at(0)?.message || '')
            }
            throw new AppError((error as AppError).message)
        }
    }
}

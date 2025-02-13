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

    public getTransactionsPaginated = async (req: Request, res: Response) => {
        const { page, pageSize } = req.query
        console.log('page, pageSize:', page, pageSize)
        const data = await this.transactionService.getTransactionsPaginated({
            page: parseInt(req.query.page as string) || 1,
            pageSize: parseInt(req.query.pageSize as string) || 10,
        })
        res.status(200).json(data)
    }

    public createTransactions = async (req: Request, res: Response) => {
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

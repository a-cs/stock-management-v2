/* eslint-disable camelcase */
import { CreateTransactionRequest } from '../schemas/transactions/CreateTransactionSchema'
import AppError from '../errors/AppError'
import { Prisma } from '../helpers/PrismaClient'

interface iPaginationRequest {
    page: number
    pageSize: number
}

export default class TransactionService {
    private prisma = Prisma.getPrisma()
    public async getTransactionsPaginated({
        page,
        pageSize,
    }: iPaginationRequest) {
        const skip = (page - 1) * pageSize
        console.log('skip:', skip)
        const [transactions, totalCount] = await Promise.all([
            this.prisma.transactions.findMany({
                skip,
                take: pageSize,
                include: {
                    users: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    items: {
                        select: {
                            id: true,
                            name: true,
                            units: {
                                select: {
                                    symbol: true,
                                },
                            },
                        },
                    },
                },
                orderBy: [{ created_at: 'desc' }],
            }),
            this.prisma.transactions.count(),
        ])
        return {
            transactions,
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page,
        }
    }

    public async createTransaction({
        item_id,
        item_quantity,
        type,
        user_id,
    }: CreateTransactionRequest) {
        const checkItemIdExists = await this.prisma.items.findFirst({
            where: { id: Number(item_id) },
        })
        if (!checkItemIdExists) {
            throw new AppError('Item não encontrado')
        }
        if (type === 'out') {
            item_quantity *= -1
        }

        const createdTransaction = await this.prisma.transactions.create({
            data: {
                item_id,
                item_quantity,
                type,
                user_id,
            },
        })

        const aggregatedTransactions = await this.prisma.transactions.aggregate(
            {
                _sum: {
                    item_quantity: true,
                },
                where: {
                    item_id,
                },
            },
        )
        const updatedItemQuantity =
            aggregatedTransactions._sum.item_quantity || 0

        await this.prisma.items.update({
            where: {
                id: Number(item_id),
            },
            data: {
                total_stock: updatedItemQuantity,
            },
        })

        return createdTransaction
    }
}

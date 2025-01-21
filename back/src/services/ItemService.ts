/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client'
import { CreateItemRequest } from '../schemas/items/CreateItemSchema'
import AppError from '../errors/AppError'
import { UpdateItemRequest } from '../schemas/items/UpdateItemSchema'

export default class ItemService {
    private prisma = new PrismaClient()

    private initialStockValue = 0

    public async getAllItems() {
        return await this.prisma.items.findMany({
            orderBy: [{ name: 'asc' }],
        })
    }

    public async getAllItemsOrdered() {
        return await this.prisma.$queryRaw`
        	SELECT i.id,
			i.name,
			i.minimal_stock_alarm,
			i.total_stock,
			i.created_at,
			i.updated_at,
			i.unit_id,
			u.symbol
        	FROM items i
        	LEFT JOIN units u ON i.unit_id = u.id
        	ORDER BY (i.total_stock < i.minimal_stock_alarm) DESC, i.name ASC;
          `
    }

    public async createItem({ name, unit_id }: CreateItemRequest) {
        const minimal_stock_alarm = this.initialStockValue
        const total_stock = this.initialStockValue
        name = name.toLowerCase()

        const checkItemNameExists = await this.prisma.items.findFirst({
            where: { name },
        })
        if (checkItemNameExists) {
            throw new AppError(`O nome "${name}" já está em uso.`)
        }
        const checkUnitIdExists = await this.prisma.units.findFirst({
            where: { id: Number(unit_id) },
        })
        if (!checkUnitIdExists) {
            throw new AppError('Unidade não encontrada')
        }
        const createdItem = await this.prisma.items.create({
            data: {
                name,
                minimal_stock_alarm,
                total_stock,
                unit_id,
            },
        })
        return createdItem
    }

    public async updateItem({
        id,
        name,
        unit_id,
        minimal_stock_alarm,
    }: UpdateItemRequest) {
        name = name.toLowerCase()
        const checkItemNameExists = await this.prisma.items.findFirst({
            where: { name },
        })
        if (checkItemNameExists) {
            throw new AppError(`O nome "${name}" já está em uso.`)
        }
        const checkItemIdExists = await this.prisma.units.findFirst({
            where: { id: Number(unit_id) },
        })
        if (!checkItemIdExists) {
            throw new AppError('Unidade não encontrada')
        }
        const updatedItem = await this.prisma.items.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                minimal_stock_alarm,
                unit_id,
            },
        })
        return updatedItem
    }
}

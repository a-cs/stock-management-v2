import { Request, Response } from 'express'
import ItemService from '../services/ItemService'
import { CreateItemSchema } from '../schemas/items/CreateItemSchema'
import { ZodError } from 'zod'
import AppError from '../errors/AppError'
import { UpdateItemSchema } from '../schemas/items/UpdateItemSchema'

export default class ItemController {
    private itemService: ItemService

    constructor() {
        this.itemService = new ItemService()
    }

    public getAllItems = async (req: Request, res: Response) => {
        const items = await this.itemService.getAllItems()
        res.status(200).json(items)
    }

    public getItemsPaginated = async (req: Request, res: Response) => {
        const { page, pageSize } = req.query
        const data = await this.itemService.getItemsPaginated({
            page: parseInt(page as string) || 1,
            pageSize: parseInt(pageSize as string) || 10,
        })
        res.status(200).json(data)
    }

    public createItem = async (req: Request, res: Response) => {
        try {
            const validatedData = CreateItemSchema.parse(req.body)
            await this.itemService.createItem(validatedData)
            res.status(201).send()
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.errors.at(0)?.message || '')
            }
            throw new AppError((error as AppError).message)
        }
    }

    public updateItem = async (req: Request, res: Response) => {
        try {
            const { id: idAsString } = req.params
            const id = Number(idAsString)
            const data = { id, ...req.body }
            const validatedData = UpdateItemSchema.parse(data)
            const updatedItem = await this.itemService.updateItem(validatedData)
            res.status(200).json(updatedItem)
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.errors.at(0)?.message || '')
            }
            throw new AppError((error as AppError).message)
        }
    }
}

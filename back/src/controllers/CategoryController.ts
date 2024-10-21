import { Request, Response } from 'express'
import CategoryService from '../services/CategoryService'

export default class CategoryController {
    private CategoryService: CategoryService

    constructor() {
        this.CategoryService = new CategoryService()
    }

    public getAllCategories = async (req: Request, res: Response) => {
        const categories = await this.CategoryService.getAllCategories()
        res.status(200).json(categories)
    }

    public createCategory = async (req: Request, res: Response) => {
        const { name } = req.body
        await this.CategoryService.createCategory({
            name,
        })
        res.status(201).send()
    }

    public updateCategory = async (req: Request, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        const updatedCategory = await this.CategoryService.updateCategory({
            id,
            name,
        })
        res.status(200).json(updatedCategory)
    }

    public deleteCategory = async (req: Request, res: Response) => {
        const { id } = req.params

        await this.CategoryService.deleteCategory({
            id,
        })
        res.status(204).send()
    }
}

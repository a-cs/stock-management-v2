import { PrismaClient } from '@prisma/client'
import AppError from '../errors/AppError'

interface iCreateCategoryRequest {
    name: string
}

interface iUpdateCategoryRequest {
    id: string
    name: string
}

interface iDeleteCategoryRequest {
    id: string
}

export default class CategoryService {
    private prisma = new PrismaClient()
    public async getAllCategories() {
        return await this.prisma.categories.findMany()
    }

    public async createCategory({ name }: iCreateCategoryRequest) {
        const checkCategoryExists = await this.prisma.categories.findFirst({
            where: { name },
        })
        if (checkCategoryExists) {
            throw new AppError('Category name already in use')
        }
        const category = this.prisma.categories.create({
            data: {
                name,
            },
        })
        return category
    }

    public async updateCategory({ id, name }: iUpdateCategoryRequest) {
        console.log('id:', id, Number(id))
        const checkCategoryIdExists = await this.prisma.categories.findFirst({
            where: { id: Number(id) },
        })
        if (!checkCategoryIdExists) {
            throw new AppError('Category id not found')
        }
        const checkCategoryNameExists = await this.prisma.categories.findFirst({
            where: { name },
        })
        if (checkCategoryNameExists) {
            throw new AppError('Category name already in use')
        }
        const category = this.prisma.categories.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
            },
        })
        return category
    }

    public async deleteCategory({ id }: iDeleteCategoryRequest) {
        const checkCategoryIdExists = await this.prisma.categories.findFirst({
            where: { id: Number(id) },
        })
        if (!checkCategoryIdExists) {
            throw new AppError('Category id not found')
        }
        const category = this.prisma.categories.delete({
            where: {
                id: Number(id),
            },
        })
        return category
    }
}

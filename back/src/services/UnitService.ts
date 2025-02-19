import AppError from '../errors/AppError'
import { Prisma } from '../helpers/PrismaClient'

interface iCreateUnitRequest {
    symbol: string
}

interface iUpdateUnitRequest {
    id: string
    symbol: string
}

interface iPaginationRequest {
    page: number
    pageSize: number
}

export default class UnitService {
    private prisma = Prisma.getPrisma()
    public async getAllUnits() {
        return await this.prisma.units.findMany({
            orderBy: [{ symbol: 'asc' }],
        })
    }

    public async getUnitsPaginated({ page, pageSize }: iPaginationRequest) {
        const skip = (page - 1) * pageSize
        const [units, totalCount] = await Promise.all([
            this.prisma.units.findMany({
                skip,
                take: pageSize,
                orderBy: [{ symbol: 'asc' }],
            }),
            this.prisma.units.count(),
        ])
        return {
            units,
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page,
        }
    }

    public async createUnit({ symbol }: iCreateUnitRequest) {
        const checkUnitExists = await this.prisma.units.findFirst({
            where: { symbol },
        })
        if (checkUnitExists) {
            throw new AppError(`A unidade "${symbol}" já existe.`)
        }
        const Unit = await this.prisma.units.create({
            data: {
                symbol,
            },
        })
        return Unit
    }

    public async updateUnit({ id, symbol }: iUpdateUnitRequest) {
        const checkUnitIdExists = await this.prisma.units.findFirst({
            where: { id: Number(id) },
        })
        if (!checkUnitIdExists) {
            throw new AppError('Id da unidade não encontrado')
        }
        const checkUnitNameExists = await this.prisma.units.findFirst({
            where: { symbol },
        })
        if (checkUnitNameExists && checkUnitNameExists.id !== Number(id)) {
            throw new AppError(`A unidade "${symbol}" já existe.`)
        }
        const Unit = await this.prisma.units.update({
            where: {
                id: Number(id),
            },
            data: {
                symbol,
            },
        })
        return Unit
    }

    // public async deleteUnit({ id }: iDeleteUnitRequest) {
    //     const checkUnitIdExists = await this.prisma.units.findFirst({
    //         where: { id: Number(id) },
    //     })
    //     if (!checkUnitIdExists) {
    //         throw new AppError('Id da unidade não encontrado')
    //     }
    //     const Unit = await this.prisma.units.delete({
    //         where: {
    //             id: Number(id),
    //         },
    //     })
    //     return Unit
    // }
}

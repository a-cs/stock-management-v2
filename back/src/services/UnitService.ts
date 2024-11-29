import { PrismaClient } from '@prisma/client'
import AppError from '../errors/AppError'

interface iCreateUnitRequest {
    symbol: string
}

interface iUpdateUnitRequest {
    id: string
    symbol: string
}

// interface iDeleteUnitRequest {
//     id: string
// }

export default class UnitService {
    private prisma = new PrismaClient()
    public async getAllUnits() {
        return await this.prisma.units.findMany({
            orderBy: [{ symbol: 'asc' }],
        })
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
        if (checkUnitNameExists) {
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

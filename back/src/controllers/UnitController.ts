import { Request, Response } from 'express'
import UnitService from '../services/UnitService'
import { CreateUnitSchema } from '../schemas/units/CreateUnitSchema'
import AppError from '../errors/AppError'
import { ZodError } from 'zod'

export default class UnitController {
    private unitService: UnitService

    constructor() {
        this.unitService = new UnitService()
    }

    public getAllUnits = async (req: Request, res: Response) => {
        const units = await this.unitService.getAllUnits()
        res.status(200).json(units)
    }

    public getUnitsPaginated = async (req: Request, res: Response) => {
        const { page, pageSize } = req.query
        const data = await this.unitService.getUnitsPaginated({
            page: parseInt(page as string) || 1,
            pageSize: parseInt(pageSize as string) || 10,
        })
        res.status(200).json(data)
    }

    public createUnit = async (req: Request, res: Response) => {
        try {
            const data = { ...req.body }
            const validatedData = CreateUnitSchema.parse(data)
            await this.unitService.createUnit(validatedData)
            res.status(201).send()
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.errors.at(0)?.message || '')
            }
            throw new AppError((error as AppError).message)
        }
    }

    public updateUnit = async (req: Request, res: Response) => {
        const { id } = req.params
        const { symbol } = req.body

        const updatedunit = await this.unitService.updateUnit({
            id,
            symbol,
        })
        res.status(200).json(updatedunit)
    }

    // public deleteUnit = async (req: Request, res: Response) => {
    //     const { id } = req.params

    //     await this.unitService.deleteUnit({
    //         id,
    //     })
    //     res.status(204).send()
    // }
}

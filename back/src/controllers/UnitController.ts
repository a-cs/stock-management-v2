import { Request, Response } from 'express'
import UnitService from '../services/UnitService'

export default class UnitController {
    private unitService: UnitService

    constructor() {
        this.unitService = new UnitService()
    }

    public getAllUnits = async (req: Request, res: Response) => {
        const units = await this.unitService.getAllUnits()
        res.status(200).json(units)
    }

    public createUnit = async (req: Request, res: Response) => {
        const { symbol } = req.body
        await this.unitService.createUnit({
            symbol,
        })
        res.status(201).send()
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

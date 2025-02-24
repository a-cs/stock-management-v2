/* eslint-disable camelcase */
import { Request, Response } from 'express'
import UserService from '../services/UserService'
import createUserDTO from '../DTOs/userDTO'
import AppError from '../errors/AppError'
import { UpdateUserPasswordSchema } from '../schemas/items/UpdateUserPasswordSchema'
import { ZodError } from 'zod'
import { ForgotPasswordSchema } from '../schemas/items/ForgotPasswordSchema'
import { ResetPasswordSchema } from '../schemas/items/ResetPasswordSchema'

export default class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    public getUsersPaginated = async (req: Request, res: Response) => {
        const { page, pageSize } = req.query
        const data = await this.userService.getUsersPaginated({
            page: parseInt(page as string) || 1,
            pageSize: parseInt(pageSize as string) || 10,
        })

        res.status(200).json(data)
    }

    public getMyUser = async (req: Request, res: Response) => {
        const user = await this.userService.getUser(req.user.id)
        if (user) {
            res.status(200).json(createUserDTO(user))
        } else {
            throw new AppError('Usuário não encontrado', 404)
        }
    }

    public createUser = async (req: Request, res: Response) => {
        const { name, email, password } = req.body
        await this.userService.createUser({
            name,
            email,
            password,
        })
        res.status(201).send()
    }

    public updateUserPermissions = async (req: Request, res: Response) => {
        const { id } = req.params
        const { is_admin, is_allowed } = req.body
        await this.userService.updateUserPermissions({
            id: Number(id),
            is_admin,
            is_allowed,
        })
        res.status(200).send()
    }

    public updateUserPassword = async (req: Request, res: Response) => {
        try {
            const { id: idAsString } = req.user
            const id = Number(idAsString)
            const data = { id, ...req.body }
            const validatedData = UpdateUserPasswordSchema.parse(data)
            await this.userService.updateUserPassword(validatedData)
            res.status(200).send()
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.errors.at(0)?.message || '')
            }
            throw new AppError((error as AppError).message)
        }
    }

    public forgotPassword = async (req: Request, res: Response) => {
        try {
            const data = { ...req.body }
            const validatedData = ForgotPasswordSchema.parse(data)
            const message = await this.userService.forgotPassword(validatedData)
            res.status(200).json({ message })
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.errors.at(0)?.message || '')
            }
            throw new AppError((error as AppError).message)
        }
    }

    public resetPassword = async (req: Request, res: Response) => {
        try {
            const data = { ...req.body }
            const validatedData = ResetPasswordSchema.parse(data)
            await this.userService.resetPassword(validatedData)
            res.status(200).send()
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.errors.at(0)?.message || '')
            }
            throw new AppError((error as AppError).message)
        }
    }
}

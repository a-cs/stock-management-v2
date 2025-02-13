/* eslint-disable camelcase */
import { Request, Response } from 'express'
import UserService from '../services/UserService'
import createUserDTO from '../DTOs/userDTO'
import AppError from '../errors/AppError'

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
}

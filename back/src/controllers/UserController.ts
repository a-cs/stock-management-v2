import { Request, Response } from 'express'
import UserService from '../services/UserService'
import createUserDTO from '../DTOs/userDTO'
import AppError from '../errors/AppError'

export default class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    public getAllUsers = async (req: Request, res: Response) => {
        const users = await this.userService.getAllUsers()

        res.status(200).json(users.map(createUserDTO))
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
}

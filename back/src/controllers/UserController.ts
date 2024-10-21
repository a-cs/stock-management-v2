import { Request, Response } from 'express'
import UserService from '../services/UserService'

export default class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    public getAllUsers = async (req: Request, res: Response) => {
        const users = await this.userService.getAllUsers()
        res.status(200).json(users)
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

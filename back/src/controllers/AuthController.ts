import { Request, Response } from 'express'
import AuthService from '../services/AuthService'

export default class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    public authSession = async (req: Request, res: Response): Promise<any> => {
        const { email, password } = req.body

        const { user, token } = await this.authService.login({
            email,
            password,
        })

        return res.json({ user, token })
    }
}

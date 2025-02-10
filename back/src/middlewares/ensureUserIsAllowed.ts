import { Request, Response, NextFunction } from 'express'
import UserService from '../services/UserService'
import AppError from '../errors/AppError'

export default async function ensureUserIsAllowed(
    req: Request,
    _res: Response,
    next: NextFunction,
) {
    const userService = new UserService()

    const { id } = req.user

    const user = await userService.getUser(id)

    if (!user) {
        throw new AppError('Usuário não encontrado', 404)
    }
    if (!user.is_allowed) {
        throw new AppError(
            'Usuário não tem permissão para acessar essa informação',
            401,
        )
    }
    return next()
}

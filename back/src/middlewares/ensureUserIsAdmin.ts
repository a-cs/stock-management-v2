import { Request, Response, NextFunction } from 'express'
import UserService from '../services/UserService'
import AppError from '../errors/AppError'

export default async function ensureUserIsAdmin(
    req: Request,
    _res: Response,
    next: NextFunction,
) {
    const userService = new UserService()

    const { id } = req.user

    const user = await userService.getUser(id)

    if (!user) {
        throw new AppError('Usuário não encontrado.', 404)
    }
    if (!user.is_admin) {
        throw new AppError('O Usuário não tem permissão de administrador.', 401)
    }
    return next()
}

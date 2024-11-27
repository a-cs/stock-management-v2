import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'
import authConfig from '../config/auth'
import { verify } from 'jsonwebtoken'

export default function ensureUserIsAuthenticated(
    req: Request,
    _res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new AppError('Usuário não está autenticado.', 401)
    }
    const [, token] = authHeader.split(' ')
    const { secret } = authConfig.jwt

    try {
        const decoded = verify(token, secret)

        const { sub } = decoded

        req.user = {
            id: sub as string,
        }
        return next()
    } catch {
        throw new AppError('Token de Usuário invalido.', 401)
    }
}

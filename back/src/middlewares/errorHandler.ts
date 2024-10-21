import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    console.error(err)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
}

export default errorHandler

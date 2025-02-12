import AppError from '../errors/AppError'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'
import createUserDTO from '../DTOs/userDTO'
import { Prisma } from '../helpers/PrismaClient'

interface iRequest {
    email: string
    password: string
}

export default class AuthService {
    private prisma = Prisma.getPrisma()
    public async login({ email, password }: iRequest) {
        const user = await this.prisma.users.findFirst({
            where: { email },
        })

        if (!user) {
            throw new AppError('Email ou senha incorreto.', 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError('Email ou senha incorreto.', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn,
        })

        const userWithoutPassword = createUserDTO(user)

        return {
            user: userWithoutPassword,
            token,
        }
    }
}

import { PrismaClient } from '@prisma/client'
import AppError from '../errors/AppError'
import { hash } from 'bcrypt'

interface iCreateUserRequest {
    name: string
    email: string
    password: string
}

export default class UserService {
    private prisma = new PrismaClient()
    public async getAllUsers() {
        return await this.prisma.users.findMany({ orderBy: [{ name: 'asc' }] })
    }

    public async createUser({ name, email, password }: iCreateUserRequest) {
        const checkUserExists = await this.prisma.users.findFirst({
            where: { email },
        })
        if (checkUserExists) {
            throw new AppError('Email adress already in use')
        }
        const hashedPassword = await hash(password, 8)
        const user = await this.prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                is_admin: false,
                is_allowed: false,
            },
        })
        return user
    }
}

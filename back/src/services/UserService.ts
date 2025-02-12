/* eslint-disable camelcase */
import AppError from '../errors/AppError'
import { hash } from 'bcrypt'
import { Prisma } from '../helpers/PrismaClient'

interface iCreateUserRequest {
    name: string
    email: string
    password: string
}

interface iUpdateUserPermissionsRequest {
    id: number
    is_admin: boolean
    is_allowed: boolean
}

export default class UserService {
    private prisma = Prisma.getPrisma()
    public async getAllUsers() {
        return await this.prisma.users.findMany({ orderBy: [{ name: 'asc' }] })
    }

    public async getUser(id: string) {
        return await this.prisma.users.findFirst({ where: { id: Number(id) } })
    }

    public async createUser({ name, email, password }: iCreateUserRequest) {
        const checkUserExists = await this.prisma.users.findFirst({
            where: { email },
        })
        if (checkUserExists) {
            throw new AppError('Endereço de email em uso.')
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

    public async updateUserPermissions({
        id,
        is_admin,
        is_allowed,
    }: iUpdateUserPermissionsRequest) {
        const checkUserExists = await this.prisma.users.findFirst({
            where: { id },
        })
        if (!checkUserExists) {
            throw new AppError('Usuário não encontrado.')
        }

        const user = await this.prisma.users.update({
            where: {
                id,
            },
            data: {
                is_admin,
                is_allowed,
            },
        })

        return user
    }
}

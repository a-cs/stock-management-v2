/* eslint-disable camelcase */
import AppError from '../errors/AppError'
import { compare, hash } from 'bcrypt'
import { Prisma } from '../helpers/PrismaClient'
import createUserDTO from '../DTOs/userDTO'
import { UpdateUserPasswordRequest } from '../schemas/items/UpdateUserPasswordSchema'

interface iCreateUserRequest {
    name: string
    email: string
    password: string
}

interface iPaginationRequest {
    page: number
    pageSize: number
}
interface iUpdateUserPermissionsRequest {
    id: number
    is_admin: boolean
    is_allowed: boolean
}

export default class UserService {
    private prisma = Prisma.getPrisma()
    public async getUsersPaginated({ page, pageSize }: iPaginationRequest) {
        const skip = (page - 1) * pageSize
        const [users, totalCount] = await Promise.all([
            this.prisma.users.findMany({
                skip,
                take: pageSize,
                orderBy: [{ name: 'asc' }],
            }),
            this.prisma.users.count(),
        ])
        return {
            users: users.map(createUserDTO),
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page,
        }
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

    public async updateUserPassword({
        id,
        currentPassword,
        newPassword,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        confirmNewPassword,
    }: UpdateUserPasswordRequest) {
        const checkUserExists = await this.prisma.users.findFirst({
            where: { id },
        })
        if (!checkUserExists) {
            throw new AppError('Usuário não encontrado.')
        }

        const passwordMatched = await compare(
            currentPassword,
            checkUserExists.password,
        )

        if (!passwordMatched) {
            throw new AppError('Senha incorreta.', 401)
        }

        const hashedPassword = await hash(newPassword, 8)

        const user = await this.prisma.users.update({
            where: {
                id,
            },
            data: {
                password: hashedPassword,
            },
        })

        return user
    }
}

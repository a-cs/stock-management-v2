/* eslint-disable camelcase */
import AppError from '../errors/AppError'
import { compare, hash } from 'bcrypt'
import { Prisma } from '../helpers/PrismaClient'
import createUserDTO from '../DTOs/userDTO'
import { UpdateUserPasswordRequest } from '../schemas/items/UpdateUserPasswordSchema'
import { randomUUID as uuidV4 } from 'crypto'
import { ForgotPasswordRequest } from '../schemas/items/ForgotPasswordSchema'
import { ResetPasswordRequest } from '../schemas/items/ResetPasswordSchema'
import { Mailer } from '../helpers/Mailer'

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

    public async forgotPassword({ email }: ForgotPasswordRequest) {
        const oneHour = 60 * 60 * 1000
        const message =
            'Caso o email do usuário esteja cadastrado, você recebera um email para resetar a senha.'
        const mailer = Mailer.getInstance()

        const checkUserExists = await this.prisma.users.findFirst({
            where: { email },
        })

        if (!checkUserExists) {
            return message
        }

        const resetToken = uuidV4()
        const resetTokenExpiryDate = new Date(Date.now() + oneHour)

        await this.prisma.users.update({
            where: { email },
            data: {
                reset_token: resetToken,
                reset_token_expire_date: resetTokenExpiryDate,
            },
        })

        const resetLink = `${process.env.FRONTEND_URL}/resetar-senha?token=${resetToken}`
        await mailer.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `IF Stoq - ${process.env.LAB_NAME} - Alteração de senha`,
            html: `<p><a href="${resetLink}">Clique aqui para resetar a sua senha.</a></p><p>Esse link é valido por 1 hora.</p>`,
        })

        return message
    }

    public async resetPassword({
        resetToken,
        newPassword,
    }: ResetPasswordRequest) {
        const checkUserExists = await this.prisma.users.findFirst({
            where: {
                reset_token: resetToken,
                reset_token_expire_date: { gte: new Date() },
            },
        })

        if (!checkUserExists) {
            throw new AppError(
                'Esse link para alterar a senha está inválido ou expirado. Tente novamente com um novo link',
            )
        }

        const hashedPassword = await hash(newPassword, 8)

        await this.prisma.users.update({
            where: {
                id: checkUserExists.id,
            },
            data: {
                password: hashedPassword,
                reset_token: null,
                reset_token_expire_date: null,
            },
        })
    }
}

import { Prisma } from '../helpers/PrismaClient'
import { hash } from 'bcrypt'

export default class RunOnServerStartup {
    private prisma = Prisma.getPrisma()

    public async createFirstUserIfServerIsEmpty() {
        const name = process.env.FIRST_USER_NAME || 'admin'
        const email = process.env.FIRST_USER_EMAIL || 'admin@email.com'
        const password = process.env.FIRST_USER_PASSWORD || '123456'
        const hashedPassword = await hash(password, 8)

        const checkUserExists = await this.prisma.users.findFirst()

        if (!checkUserExists) {
            await this.prisma.users.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    is_admin: true,
                    is_allowed: true,
                },
            })
            console.log(`First user created with email: ${email}.`)
        }
    }
}

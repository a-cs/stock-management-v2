import type { users as User } from '@prisma/client'

export type UserDTO = Omit<
    User,
    'password' | 'reset_token' | 'reset_token_expire_date'
>

export default function createUserDTO(user: User): UserDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, camelcase
    const { password, reset_token, reset_token_expire_date, ...userDTO } = user
    return userDTO
}

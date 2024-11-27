import type { users as User } from '@prisma/client'

type UserDTO = Omit<User, 'password'>

export default function createUserDTO(user: User): UserDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDTO } = user
    return userDTO
}

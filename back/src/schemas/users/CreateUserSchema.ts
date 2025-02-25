import { z } from 'zod'
import { passwordSchema } from './PasswordSchema'

export const CreateUserSchema = z.object({
    name: z
        .string({
            required_error: 'O nome é obrigatório.',
            invalid_type_error: 'O nome precisa ser uma string.',
        })
        .min(2, {
            message: 'O nome precisa conter no mínimo 2 caracteres.',
        })
        .max(20, {
            message: 'O nome precisa conter no máximo 20 caracteres.',
        }),
    email: z
        .string({
            required_error: 'O email é obrigatório.',
            invalid_type_error: 'O email precisa ser uma string.',
        })
        .email({ message: 'Email inválido.' }),
    password: passwordSchema,
})

export type CreateUserRequest = z.infer<typeof CreateUserSchema>

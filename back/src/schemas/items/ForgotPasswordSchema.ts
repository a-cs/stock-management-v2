import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
    email: z
        .string({
            required_error: 'O email é obrigatório.',
            invalid_type_error: 'O email precisa ser uma string.',
        })
        .email({ message: 'Email invalido.' }),
})

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>

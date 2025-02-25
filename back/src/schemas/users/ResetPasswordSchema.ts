import { z } from 'zod'
import { passwordSchema } from './PasswordSchema'

export const ResetPasswordSchema = z
    .object({
        resetToken: z.string({
            required_error: 'O token é obrigatório.',
            invalid_type_error: 'O token precisa ser uma string.',
        }),
        newPassword: passwordSchema,
        confirmNewPassword: z.string({
            required_error: 'A senha de confirmação atual é obrigatória.',
            invalid_type_error:
                'A senha de confirmação precisa ser uma string.',
        }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message:
            'O valor da senha de confirmação é diferente do valor fornecido na nova senha.',
        path: ['confirm'],
    })

export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>

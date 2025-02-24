import { z } from 'zod'

export const ResetPasswordSchema = z
    .object({
        resetToken: z.string({
            required_error: 'O token é obrigatório.',
            invalid_type_error: 'O token precisa ser uma string.',
        }),
        newPassword: z
            .string({
                required_error: 'A nova senha atual é obrigatória.',
                invalid_type_error: 'A nova senha precisa ser uma string.',
            })
            .min(6, 'A nova senha precisa conter no mínimo 6 caracteres.'),
        confirmNewPassword: z
            .string({
                required_error: 'A senha de confirmação atual é obrigatória.',
                invalid_type_error:
                    'A senha de confirmação precisa ser uma string.',
            })
            .min(
                6,
                'A senha de confirmação precisa conter no mínimo 6 caracteres.',
            ),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message:
            'O valor da senha de confirmação é diferente do valor fornecido na nova senha.',
        path: ['confirm'],
    })

export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>

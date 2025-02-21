import { z } from 'zod'

export const UpdateUserPasswordSchema = z
    .object({
        id: z
            .number({
                required_error: 'O id de usuário é obrigatório.',
                invalid_type_error: 'O id de usuário precisa ser um número.',
            })
            .int('O id de usuário precisa ser inteiro.')
            .min(1, 'O id de usuário precisar ser maior que zero.'),
        currentPassword: z
            .string({
                required_error: 'A senha atual é obrigatória.',
                invalid_type_error: 'A senha  precisa ser uma string.',
            })
            .min(6, 'A senha precisa conter no mínimo 6 caracteres.'),
        newPassword: z
            .string({
                required_error: 'A nova senha atual é obrigatória.',
                invalid_type_error: 'A nova senha  precisa ser uma string.',
            })
            .min(6, 'A nova senha precisa conter no mínimo 6 caracteres.'),
        confirmNewPassword: z
            .string({
                required_error: 'A senha de confirmação atual é obrigatória.',
                invalid_type_error:
                    'A senha de confirmação  precisa ser uma string.',
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

export type UpdateUserPasswordRequest = z.infer<typeof UpdateUserPasswordSchema>

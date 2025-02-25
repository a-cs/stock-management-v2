import { z } from 'zod'

export const passwordSchema = z
    .string({
        required_error: 'A senha é obrigatório.',
        invalid_type_error: 'A senha precisa ser uma string.',
    })
    .min(6, { message: 'A senha precisa conter no mínimo 6 caracteres.' })
    .max(20, { message: 'A senha precisa conter no máximo 20 caracteres.' })
    .refine((password) => /[A-Z]/.test(password), {
        message: 'A senha precisa conter ao menos uma letra maiúscula.',
    })
    .refine((password) => /[a-z]/.test(password), {
        message: 'A senha precisa conter ao menos uma letra minúscula.',
    })
    .refine((password) => /[0-9]/.test(password), {
        message: 'A senha precisa conter ao menos um número.',
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
        message:
            'A senha precisa conter ao menos um caractere especial (!@#$%^&*).',
    })

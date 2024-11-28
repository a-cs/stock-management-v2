import { z } from 'zod'

export const CreateItemSchema = z.object({
    name: z
        .string({
            required_error: 'O nome é obrigatório.',
            invalid_type_error: 'O nome precisa ser uma string.',
        })
        .min(3, 'O nome precisa conter no mínimo 3 caracteres'),
    unit_id: z
        .number({
            required_error: 'O unit_id é obrigatório.',
            invalid_type_error: 'O unit_id precisa ser um número.',
        })
        .int('O código da unidade precisar ser inteiro')
        .min(1, 'O código da unidade precisar ser maior que zero'),
})

export type CreateItemRequest = z.infer<typeof CreateItemSchema>

import { z } from 'zod'

export const CreateTransactionSchema = z.object({
    item_id: z
        .number({
            required_error: 'O item_id é obrigatório.',
            invalid_type_error: 'O item_id precisa ser um número.',
        })
        .int('O código do item precisar ser inteiro')
        .min(1, 'O código do item precisar ser maior que zero.'),
    item_quantity: z
        .number({
            required_error: 'O item_quantity é obrigatório.',
            invalid_type_error: 'O item_quantity precisa ser um número.',
        })
        .int('A quantidade do item precisar ser inteiro.')
        .min(1, 'A quantidade do item precisar ser maior que zero.'),
    type: z.enum(['in', 'out'], {
        errorMap: (_issue, _ctx) => ({
            message: 'Tipo de transação não permitido.',
        }),
    }),
    user_id: z
        .number({
            required_error: 'O user_id é obrigatório.',
            invalid_type_error: 'O user_id precisa ser um número.',
        })
        .int('O id do usuário precisar ser inteiro.')
        .min(1, 'O id do usuário precisar ser maior que zero.'),
})

export type CreateTransactionRequest = z.infer<typeof CreateTransactionSchema>

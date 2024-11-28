import { z } from 'zod'

export const UpdateItemSchema = z.object({
    id: z
        .number({
            required_error: 'O id é obrigatório.',
            invalid_type_error: 'O id precisa ser um número.',
        })
        .int('O id precisa ser inteiro')
        .min(1, 'O id precisar ser maior que zero'),
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
        .min(1, 'O código da unidade precisa ser maior que zero'),
    minimal_stock_alarm: z
        .number({
            required_error: 'O valor mínimo para alarme é obrigatório.',
            invalid_type_error:
                'O valor mínimo para alarme precisa ser um número.',
        })
        .int('O valor mínimo para alarme precisar ser inteiro')
        .min(0, 'O valor mínimo para alarme precisa ser maior ou igual a zero'),
})

export type UpdateItemRequest = z.infer<typeof UpdateItemSchema>

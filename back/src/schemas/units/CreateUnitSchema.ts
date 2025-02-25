import { z } from 'zod'

export const CreateUnitSchema = z.object({
    symbol: z
        .string({
            required_error: 'A unidade é obrigatória.',
            invalid_type_error: 'A unidade precisa ser uma string.',
        })
        .min(1, 'A unidade precisa conter no mínimo 1 caracteres.')
        .max(10, 'A unidade precisa conter no máximo 10 caracteres.'),
})

export type CreateUnitRequest = z.infer<typeof CreateUnitSchema>

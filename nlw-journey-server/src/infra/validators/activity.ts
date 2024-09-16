import { z } from 'zod';

const baseActivitySchema = {
    title: z
        .string({ required_error: 'O campo "Título" é obrigatório.' })
        .min(4, 'O título da atividade deve ter pelo menos 4 caracteres.'),
    occurs_at: z.coerce.date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date' ? 'A data da atividade é inválida ou não foi informada' : defaultError,
        }),
    }),
};

export const TripActivityCreateRequestSchema = z.object(baseActivitySchema, {
    required_error: 'Os dados para a criação da atividade para viagem são obrigatórios.',
});

export const TripActivityUpdateRequestSchema = z.object(baseActivitySchema, {
    required_error: 'Os dados para a atualização da atividade para viagem são obrigatórios.',
});

import { z } from 'zod';

const baseLinkSchema = {
    url: z
        .string({ required_error: 'O campo "URL" é obrigatório.' })
        .min(4, 'O título da URL deve ter pelo menos 4 caracteres.'),
    title: z
        .string({ required_error: 'O campo "Título" é obrigatório.' })
        .min(4, 'O título da atividade deve ter pelo menos 4 caracteres.'),
};

export const TripLinkCreateRequestSchema = z.object(baseLinkSchema, {
    required_error: 'Os dados para a criação do link para viagem são obrigatórios.',
});

export const TripLinkUpdateRequestSchema = z.object(baseLinkSchema, {
    required_error: 'Os dados para a atualização do link para viagem são obrigatórios.',
});

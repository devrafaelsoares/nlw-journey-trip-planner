import { z } from 'zod';

export const TripConfirmationParticipantSchema = z.object({
    email: z.string().email('Email inválido'),
    name: z.string({ required_error: 'Nome é obrigatório' }).min(1, 'Nome é obrigatório'),
});

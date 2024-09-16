import { z } from 'zod';

export const TravelSchema = z
    .object({
        email: z.string().email('Email inválido'),
        emailsToInvite: z
            .array(
                z.object({
                    id: z.string(),
                    email: z.string().email('Email inválido'),
                })
            )
            .optional(),
        travelDate: z.object(
            {
                from: z.date().optional(),
                to: z.date().optional(),
            },
            { required_error: 'Data da viagem é obrigatória' }
        ),
        destination: z.string().min(1, 'O local da viagem é obrigatório'),
        ownerEmail: z
            .string()
            .email('Email do organizador da viagem está inválido')
            .min(1, 'Email do organizador da viagem é obrigatório'),
        ownerName: z.string().min(1, 'Nome do organizador da viagem é obrigatório'),
    })
    .refine(({ email, emailsToInvite }) => !emailsToInvite?.find(emailData => emailData.email === email), {
        message: 'Email já informado',
        path: ['email'],
    })
    .refine(data => !!data.travelDate.to, {
        path: ['travelDate'],
        message: 'Data de término é obrigatória',
    });

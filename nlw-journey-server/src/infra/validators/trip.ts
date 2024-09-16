import { z } from 'zod';

const baseTripSchema = {
    destination: z
        .string({ required_error: 'O campo "Destino" é obrigatório.' })
        .min(4, 'O destino deve ter pelo menos 4 caracteres.'),
    starts_at: z.coerce.date({
        errorMap: (issue, { defaultError }) => ({
            message: issue.code === 'invalid_date' ? 'A data de início inválida ou não informada' : defaultError,
        }),
    }),
    ends_at: z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message: issue.code === 'invalid_date' ? 'A data de término inválida ou não informada' : defaultError,
            }),
        })
        .describe('Data e hora de término da viagem'),
};

export const TripCreateRequestSchema = z.object(
    {
        ...baseTripSchema,
        owner_name: z.string({ required_error: 'O campo "Nome do organizador" é obrigatório.' }),
        owner_email: z
            .string({ required_error: 'O campo "Email do organizador" é obrigatório.' })
            .email('O email fornecido é inválido.'),
        emails_to_invite: z.array(z.string().email('Um ou mais emails fornecidos são inválidos.')).optional(),
    },
    { required_error: 'Os dados para a criação da viagem são obrigatórios.' }
);

export const TripUpdateRequestSchema = z.object(
    {
        ...baseTripSchema,
    },
    { required_error: 'Os dados para a edição da viagem são obrigatórios.' }
);

export const TripSendInviteRequestSchema = z.object(
    {
        guest_email: z
            .string({ required_error: 'O campo "Email" é obrigatório.' })
            .email('Email inválido')
            .min(4, 'O email deve ter pelo menos 4 caracteres.'),
    },
    { required_error: 'Os dados para o envio do convite são obrigatórios.' }
);

export const TripParticipantConfirmRequestSchema = z.object(
    {
        participant_name: z.string({ required_error: 'O campo "Nome do participante" é obrigatório.' }),
    },
    { required_error: 'Os dados para o envio do convite são obrigatórios.' }
);

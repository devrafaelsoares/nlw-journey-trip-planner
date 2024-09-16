import { FastifySchema } from 'fastify';
import { z } from 'zod';
import {
    TripCreateRequestSchema,
    TripParticipantConfirmRequestSchema,
    TripSendInviteRequestSchema,
    TripUpdateRequestSchema,
} from '@infra/validators/trip';
import {
    AttendanceConfirmationTripParamsSchema,
    ConfirmationTripParamsSchema,
    FindByIdTripParamsSchema,
    InviteRefuseTripParamsSchema,
    RefuseTripParamsSchema,
    SendInviteTripParamsSchema,
    UpdateTripParamsSchema,
} from './params/trip';
import {
    ResponseBadRequestStructure,
    ResponseConflictStructure,
    ResponseNotFoundStructure,
    ResponseSuccessStructure,
} from '@infra/fastify/responses/structure';
import { ActivitySchema } from './activity';
import { LinkSchema } from './link';

// Esquemas comuns
const OwnerSchema = z.object({
    id: z.string().uuid().describe('Identificador único do proprietário'),
    email: z.string().email().describe('Endereço de e-mail do proprietário'),
    name: z.string().describe('Nome do proprietário'),
});

const ParticipantSchema = z.object({
    id: z.string().uuid().describe('Identificador único do participante'),
    name: z.string().nullable().describe('Nome do participante'),
    email: z.string().email().describe('Endereço de e-mail do participante'),
    isConfirmed: z.boolean().describe('Confirmação de presença do participante'),
});

const TripSchema = z.object({
    id: z.string().uuid().describe('Identificador único da viagem'),
    destination: z.string().describe('Destino da viagem'),
    starts_at: z.coerce.date().describe('Data e hora de início da viagem'),
    ends_at: z.coerce.date().describe('Data e hora de término da viagem'),
    owner: OwnerSchema.describe('Detalhes do proprietário da viagem'),
    activities: z.array(ActivitySchema).describe('Lista de atividades planejadas para uma viagem'),
    links: z.array(LinkSchema).describe('Lista de URLs relacionadas à viagem'),
    participants: z.array(ParticipantSchema).describe('Lista de participantes associados à viagem'),
    emails_to_invite: z
        .array(z.string().email())
        .describe('Lista de endereços de e-mail para convidar para uma viagem'),
});

// Esquemas de resposta de sucesso
const SuccessTripResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.object({
        trip: TripSchema.describe('Detalhes da viagem'),
    }),
});

const SuccessTripsResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.object({
        trips: z.array(TripSchema).default([]),
    }),
});

const SuccessMessageResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.object({
        message: z.string(),
    }),
});

// Esquemas de resposta de erro
const ErrorMessageSchema = z.object({
    message: z.string().describe('Mensagem detalhando o erro ocorrido'),
});

const NotFoundTripResponseSchema = z.object({
    ...ResponseNotFoundStructure,
    data: ErrorMessageSchema,
});

const BadRequestTripResponseSchema = z.object({
    ...ResponseBadRequestStructure,
    data: z.object({
        errors: z.array(
            z.object({
                path: z.string().describe('Campo com erro'),
                message: z.string().describe('Mensagem detalhando o erro ocorrido'),
            })
        ),
    }),
});

const ConflictTripResponseSchema = z.object({
    ...ResponseConflictStructure,
    data: ErrorMessageSchema,
});

// Definições de esquemas Fastify
export const TripCreateSchema: FastifySchema = {
    description: 'Criar uma nova viagem',
    tags: ['Trip'],
    body: TripCreateRequestSchema,
    response: {
        200: SuccessTripResponseSchema.describe('Viagem criada com sucesso'),
        400: BadRequestTripResponseSchema.describe('Erro ao criar uma viagem'),
    },
};

export const TripUpdateSchema: FastifySchema = {
    description: 'Atualizar uma viagem',
    tags: ['Trip'],
    body: TripUpdateRequestSchema,
    params: UpdateTripParamsSchema,
    response: {
        200: SuccessTripResponseSchema.describe('Viagem atualizada com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        400: BadRequestTripResponseSchema.describe('Erro ao atualizar uma viagem'),
    },
};

export const TripGetAllSchema: FastifySchema = {
    description: 'Buscar todas as viagens',
    tags: ['Trip'],
    response: {
        200: SuccessTripsResponseSchema.describe('Viagens encontradas com sucesso'),
    },
};

export const TripFindByIdSchema: FastifySchema = {
    description: 'Buscar uma viagem pelo ID',
    params: FindByIdTripParamsSchema,
    tags: ['Trip'],
    response: {
        200: SuccessTripResponseSchema.describe('Viagem encontrada com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
    },
};

export const TripSendInviteSchema: FastifySchema = {
    description: 'Enviar um convite para um usuário',
    params: SendInviteTripParamsSchema,
    body: TripSendInviteRequestSchema,
    tags: ['Trip'],
    response: {
        200: SuccessTripResponseSchema.describe('Convite enviado com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
    },
};

export const TripAttendanceConfirmationSchema: FastifySchema = {
    description: 'Confirmar a presença na viagem',
    params: AttendanceConfirmationTripParamsSchema,
    body: TripParticipantConfirmRequestSchema,
    tags: ['Participant'],
    response: {
        200: SuccessMessageResponseSchema.describe('Participante confirmado com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        429: ConflictTripResponseSchema.describe('Participante já confirmou a presença na viagem'),
    },
};

export const TripRefuseInviteSchema: FastifySchema = {
    description: 'Recusar o convite da viagem',
    params: InviteRefuseTripParamsSchema,
    tags: ['Participant'],
    response: {
        200: SuccessMessageResponseSchema.describe('Convite recusado com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        429: ConflictTripResponseSchema.describe('Convite já foi recusado'),
    },
};

export const TripRefuseSchema: FastifySchema = {
    description: 'Cancelar uma viagem',
    params: RefuseTripParamsSchema,
    tags: ['Trip'],
    response: {
        200: SuccessMessageResponseSchema.describe('Viagem cancelada com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        429: ConflictTripResponseSchema.describe('Viagem já foi cancelada'),
    },
};

export const TripConfirmationSchema: FastifySchema = {
    description: 'Confirmar uma viagem',
    params: ConfirmationTripParamsSchema,
    tags: ['Trip'],
    response: {
        200: SuccessMessageResponseSchema.describe('Viagem confirmada com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        429: ConflictTripResponseSchema.describe('Viagem já foi confirmada'),
    },
};

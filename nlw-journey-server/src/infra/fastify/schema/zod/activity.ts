import { z } from 'zod';
import {
    ResponseBadRequestStructure,
    ResponseNotFoundStructure,
    ResponseSuccessStructure,
} from '@infra/fastify/responses/structure';
import { FastifySchema } from 'fastify';
import { TripActivityCreateRequestSchema, TripActivityUpdateRequestSchema } from '@infra/validators/activity';

export const ActivitySchema = z.object({
    id: z.string().uuid().describe('Identificador único da atividade'),
    title: z.string().describe('Título da atividade'),
    occurs_at: z.coerce.date().describe('Data e hora em que a atividade ocorre'),
});

export const NotFoundActivityResponseSchema = z.object({
    ...ResponseNotFoundStructure,
    data: z.object({
        message: z.string().describe('Mensagem detalhando o erro ocorrido'),
    }),
});

export const BadRequestActivityResponseSchema = z.object({
    ...ResponseBadRequestStructure,
    data: z.array(
        z.object({
            path: z.string().describe('Campo com erro'),
            message: z.string().describe('Mensagem detalhando o erro ocorrido'),
        })
    ),
});

const ErrorMessageSchema = z.object({
    message: z.string().describe('Mensagem detalhando o erro ocorrido'),
});

const NotFoundActivityOrTripResponseSchema = z.object({
    ...ResponseNotFoundStructure,
    data: ErrorMessageSchema,
});

const SuccessLinkResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.object({
        activity: ActivitySchema,
    }),
});

const SuccessActivitiesResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.object({
        activities: z.array(ActivitySchema),
    }),
});

export const SuccessActivityDeleteResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.null(),
});

export const SuccessActivityCreateResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.object({
        activity: ActivitySchema,
    }),
});

export const SuccessActivityUpdateResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.object({
        activity: ActivitySchema,
    }),
});

export const TripActivityFindByIdAndTripSchema: FastifySchema = {
    description: 'Buscar uma atividade específica por ID e viagem',
    tags: ['Activity'],
    response: {
        200: SuccessLinkResponseSchema.describe('Atividade encontrada com sucesso'),
        404: NotFoundActivityOrTripResponseSchema.describe('Viagem ou atividade não encontrada'),
    },
};

export const TripActivityFindAllSchema: FastifySchema = {
    description: 'Buscar todas as atividades da viagem',
    tags: ['Activity'],
    response: {
        200: SuccessActivitiesResponseSchema.describe('Atividades encontradas com sucesso'),
        404: NotFoundActivityOrTripResponseSchema.describe('Viagem não encontrada'),
    },
};

export const TripActivityDeleteSchema: FastifySchema = {
    description: 'Deletar uma atividade da viagem',
    tags: ['Activity'],
    response: {
        200: SuccessActivityDeleteResponseSchema.describe('Atividade deletada com sucesso'),
        404: NotFoundActivityResponseSchema.describe('Viagem não encontrada'),
    },
};

export const TripActivityCreationSchema: FastifySchema = {
    description: 'Criar uma nova atividade pra viagem',
    tags: ['Activity'],
    body: TripActivityCreateRequestSchema,
    response: {
        200: SuccessActivityCreateResponseSchema.describe('Atividade criada com sucesso'),
        404: NotFoundActivityResponseSchema.describe('Viagem não encontrada'),
        400: BadRequestActivityResponseSchema.describe('Atividade não criada'),
    },
};

export const TripActivityUpdateSchema: FastifySchema = {
    description: 'Atualizar uma atividade da viagem',
    tags: ['Activity'],
    body: TripActivityUpdateRequestSchema,
    response: {
        200: SuccessActivityUpdateResponseSchema.describe('Atividade atualizada com sucesso'),
        404: NotFoundActivityResponseSchema.describe('Viagem não encontrada'),
        400: BadRequestActivityResponseSchema.describe('Atividade não criada'),
    },
};

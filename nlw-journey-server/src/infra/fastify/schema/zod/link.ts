import { z } from 'zod';
import {
    ResponseBadRequestStructure,
    ResponseNotFoundStructure,
    ResponseSuccessStructure,
} from '@infra/fastify/responses/structure';
import { FastifySchema } from 'fastify';
import { TripLinkCreateRequestSchema, TripLinkUpdateRequestSchema } from '@infra/validators/link';

export const LinkSchema = z.object({
    id: z.string().uuid().describe('Identificador único do link'),
    url: z.string().url().describe('URL do link'),
    title: z.string().describe('Título do link'),
});

const ErrorMessageSchema = z.object({
    message: z.string().describe('Mensagem detalhando o erro ocorrido'),
});

const NotFoundLinkOrTripResponseSchema = z.object({
    ...ResponseNotFoundStructure,
    data: ErrorMessageSchema,
});

const BadRequestTripLinkResponseSchema = z.object({
    ...ResponseBadRequestStructure,
    data: z.array(
        z.object({
            path: z.string().describe('Campo com erro'),
            message: z.string().describe('Mensagem detalhando o erro ocorrido'),
        })
    ),
});

const SuccessLinkResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.object({
        link: LinkSchema,
    }),
});

const SuccessLinksResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.object({
        links: z.array(LinkSchema),
    }),
});

const SuccessLinkDeleteResponseSchema = z.object({
    ...ResponseSuccessStructure,
    data: z.null(),
});

export const TripLinkFindByIdAndTripSchema: FastifySchema = {
    description: 'Buscar um link específico pelo ID e pela viagem',
    tags: ['Link'],
    response: {
        200: SuccessLinkResponseSchema.describe('Link encontrado com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem ou link não encontrados'),
    },
};

export const TripLinkFindAllSchema: FastifySchema = {
    description: 'Buscar todos os links da viagem',
    tags: ['Link'],
    response: {
        200: SuccessLinksResponseSchema.describe('Links encontrados com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem não encontrada'),
    },
};

export const TripLinkUpdateSchema: FastifySchema = {
    description: 'Atualizar um link da viagem',
    tags: ['Link'],
    body: TripLinkUpdateRequestSchema,
    response: {
        200: SuccessLinkResponseSchema.describe('Link atualizado com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem ou link não encontrados'),
        400: BadRequestTripLinkResponseSchema.describe('Erro ao atualizar o link'),
    },
};

export const TripLinkDeleteSchema: FastifySchema = {
    description: 'Deletar um link da viagem',
    tags: ['Link'],
    response: {
        200: SuccessLinkDeleteResponseSchema.describe('Link deletado com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem ou link não encontrados'),
    },
};

export const TripLinkCreateSchema: FastifySchema = {
    description: 'Criar um novo link para a viagem',
    tags: ['Link'],
    body: TripLinkCreateRequestSchema,
    response: {
        200: SuccessLinkResponseSchema.describe('Link criado com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem não encontrada'),
        400: BadRequestTripLinkResponseSchema.describe('Erro ao criar o link'),
    },
};

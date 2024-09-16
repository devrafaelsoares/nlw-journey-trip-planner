"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripLinkCreateSchema = exports.TripLinkDeleteSchema = exports.TripLinkUpdateSchema = exports.TripLinkFindAllSchema = exports.TripLinkFindByIdAndTripSchema = exports.LinkSchema = void 0;
var zod_1 = require("zod");
var structure_1 = require("../../../fastify/responses/structure");
var link_1 = require("../../../validators/link");
exports.LinkSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().describe('Identificador único do link'),
    url: zod_1.z.string().url().describe('URL do link'),
    title: zod_1.z.string().describe('Título do link'),
});
var ErrorMessageSchema = zod_1.z.object({
    message: zod_1.z.string().describe('Mensagem detalhando o erro ocorrido'),
});
var NotFoundLinkOrTripResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseNotFoundStructure), { data: ErrorMessageSchema }));
var BadRequestTripLinkResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseBadRequestStructure), { data: zod_1.z.array(zod_1.z.object({
        path: zod_1.z.string().describe('Campo com erro'),
        message: zod_1.z.string().describe('Mensagem detalhando o erro ocorrido'),
    })) }));
var SuccessLinkResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.object({
        link: exports.LinkSchema,
    }) }));
var SuccessLinksResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.object({
        links: zod_1.z.array(exports.LinkSchema),
    }) }));
var SuccessLinkDeleteResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.null() }));
exports.TripLinkFindByIdAndTripSchema = {
    description: 'Buscar um link específico pelo ID e pela viagem',
    tags: ['Link'],
    response: {
        200: SuccessLinkResponseSchema.describe('Link encontrado com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem ou link não encontrados'),
    },
};
exports.TripLinkFindAllSchema = {
    description: 'Buscar todos os links da viagem',
    tags: ['Link'],
    response: {
        200: SuccessLinksResponseSchema.describe('Links encontrados com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem não encontrada'),
    },
};
exports.TripLinkUpdateSchema = {
    description: 'Atualizar um link da viagem',
    tags: ['Link'],
    body: link_1.TripLinkUpdateRequestSchema,
    response: {
        200: SuccessLinkResponseSchema.describe('Link atualizado com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem ou link não encontrados'),
        400: BadRequestTripLinkResponseSchema.describe('Erro ao atualizar o link'),
    },
};
exports.TripLinkDeleteSchema = {
    description: 'Deletar um link da viagem',
    tags: ['Link'],
    response: {
        200: SuccessLinkDeleteResponseSchema.describe('Link deletado com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem ou link não encontrados'),
    },
};
exports.TripLinkCreateSchema = {
    description: 'Criar um novo link para a viagem',
    tags: ['Link'],
    body: link_1.TripLinkCreateRequestSchema,
    response: {
        200: SuccessLinkResponseSchema.describe('Link criado com sucesso'),
        404: NotFoundLinkOrTripResponseSchema.describe('Viagem não encontrada'),
        400: BadRequestTripLinkResponseSchema.describe('Erro ao criar o link'),
    },
};

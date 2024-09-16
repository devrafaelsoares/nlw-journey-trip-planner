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
exports.TripActivityUpdateSchema = exports.TripActivityCreationSchema = exports.TripActivityDeleteSchema = exports.TripActivityFindAllSchema = exports.TripActivityFindByIdAndTripSchema = exports.SuccessActivityUpdateResponseSchema = exports.SuccessActivityCreateResponseSchema = exports.SuccessActivityDeleteResponseSchema = exports.BadRequestActivityResponseSchema = exports.NotFoundActivityResponseSchema = exports.ActivitySchema = void 0;
var zod_1 = require("zod");
var structure_1 = require("../../../fastify/responses/structure");
var activity_1 = require("../../../validators/activity");
exports.ActivitySchema = zod_1.z.object({
    id: zod_1.z.string().uuid().describe('Identificador único da atividade'),
    title: zod_1.z.string().describe('Título da atividade'),
    occurs_at: zod_1.z.coerce.date().describe('Data e hora em que a atividade ocorre'),
});
exports.NotFoundActivityResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseNotFoundStructure), { data: zod_1.z.object({
        message: zod_1.z.string().describe('Mensagem detalhando o erro ocorrido'),
    }) }));
exports.BadRequestActivityResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseBadRequestStructure), { data: zod_1.z.array(zod_1.z.object({
        path: zod_1.z.string().describe('Campo com erro'),
        message: zod_1.z.string().describe('Mensagem detalhando o erro ocorrido'),
    })) }));
var ErrorMessageSchema = zod_1.z.object({
    message: zod_1.z.string().describe('Mensagem detalhando o erro ocorrido'),
});
var NotFoundActivityOrTripResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseNotFoundStructure), { data: ErrorMessageSchema }));
var SuccessLinkResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.object({
        activity: exports.ActivitySchema,
    }) }));
var SuccessActivitiesResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.object({
        activities: zod_1.z.array(exports.ActivitySchema),
    }) }));
exports.SuccessActivityDeleteResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.null() }));
exports.SuccessActivityCreateResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.object({
        activity: exports.ActivitySchema,
    }) }));
exports.SuccessActivityUpdateResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.object({
        activity: exports.ActivitySchema,
    }) }));
exports.TripActivityFindByIdAndTripSchema = {
    description: 'Buscar uma atividade específica por ID e viagem',
    tags: ['Activity'],
    response: {
        200: SuccessLinkResponseSchema.describe('Atividade encontrada com sucesso'),
        404: NotFoundActivityOrTripResponseSchema.describe('Viagem ou atividade não encontrada'),
    },
};
exports.TripActivityFindAllSchema = {
    description: 'Buscar todas as atividades da viagem',
    tags: ['Activity'],
    response: {
        200: SuccessActivitiesResponseSchema.describe('Atividades encontradas com sucesso'),
        404: NotFoundActivityOrTripResponseSchema.describe('Viagem não encontrada'),
    },
};
exports.TripActivityDeleteSchema = {
    description: 'Deletar uma atividade da viagem',
    tags: ['Activity'],
    response: {
        200: exports.SuccessActivityDeleteResponseSchema.describe('Atividade deletada com sucesso'),
        404: exports.NotFoundActivityResponseSchema.describe('Viagem não encontrada'),
    },
};
exports.TripActivityCreationSchema = {
    description: 'Criar uma nova atividade pra viagem',
    tags: ['Activity'],
    body: activity_1.TripActivityCreateRequestSchema,
    response: {
        200: exports.SuccessActivityCreateResponseSchema.describe('Atividade criada com sucesso'),
        404: exports.NotFoundActivityResponseSchema.describe('Viagem não encontrada'),
        400: exports.BadRequestActivityResponseSchema.describe('Atividade não criada'),
    },
};
exports.TripActivityUpdateSchema = {
    description: 'Atualizar uma atividade da viagem',
    tags: ['Activity'],
    body: activity_1.TripActivityUpdateRequestSchema,
    response: {
        200: exports.SuccessActivityUpdateResponseSchema.describe('Atividade atualizada com sucesso'),
        404: exports.NotFoundActivityResponseSchema.describe('Viagem não encontrada'),
        400: exports.BadRequestActivityResponseSchema.describe('Atividade não criada'),
    },
};

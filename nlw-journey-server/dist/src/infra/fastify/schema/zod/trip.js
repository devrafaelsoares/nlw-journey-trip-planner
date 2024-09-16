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
exports.TripConfirmationSchema = exports.TripRefuseSchema = exports.TripRefuseInviteSchema = exports.TripAttendanceConfirmationSchema = exports.TripSendInviteSchema = exports.TripFindByIdSchema = exports.TripGetAllSchema = exports.TripUpdateSchema = exports.TripCreateSchema = void 0;
var zod_1 = require("zod");
var trip_1 = require("../../../validators/trip");
var trip_2 = require("./params/trip");
var structure_1 = require("../../../fastify/responses/structure");
var activity_1 = require("./activity");
var link_1 = require("./link");
// Esquemas comuns
var OwnerSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().describe('Identificador único do proprietário'),
    email: zod_1.z.string().email().describe('Endereço de e-mail do proprietário'),
    name: zod_1.z.string().describe('Nome do proprietário'),
});
var ParticipantSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().describe('Identificador único do participante'),
    name: zod_1.z.string().nullable().describe('Nome do participante'),
    email: zod_1.z.string().email().describe('Endereço de e-mail do participante'),
    isConfirmed: zod_1.z.boolean().describe('Confirmação de presença do participante'),
});
var TripSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().describe('Identificador único da viagem'),
    destination: zod_1.z.string().describe('Destino da viagem'),
    starts_at: zod_1.z.coerce.date().describe('Data e hora de início da viagem'),
    ends_at: zod_1.z.coerce.date().describe('Data e hora de término da viagem'),
    owner: OwnerSchema.describe('Detalhes do proprietário da viagem'),
    activities: zod_1.z.array(activity_1.ActivitySchema).describe('Lista de atividades planejadas para uma viagem'),
    links: zod_1.z.array(link_1.LinkSchema).describe('Lista de URLs relacionadas à viagem'),
    participants: zod_1.z.array(ParticipantSchema).describe('Lista de participantes associados à viagem'),
    emails_to_invite: zod_1.z
        .array(zod_1.z.string().email())
        .describe('Lista de endereços de e-mail para convidar para uma viagem'),
});
// Esquemas de resposta de sucesso
var SuccessTripResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.object({
        trip: TripSchema.describe('Detalhes da viagem'),
    }) }));
var SuccessTripsResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.object({
        trips: zod_1.z.array(TripSchema).default([]),
    }) }));
var SuccessMessageResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseSuccessStructure), { data: zod_1.z.object({
        message: zod_1.z.string(),
    }) }));
// Esquemas de resposta de erro
var ErrorMessageSchema = zod_1.z.object({
    message: zod_1.z.string().describe('Mensagem detalhando o erro ocorrido'),
});
var NotFoundTripResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseNotFoundStructure), { data: ErrorMessageSchema }));
var BadRequestTripResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseBadRequestStructure), { data: zod_1.z.object({
        errors: zod_1.z.array(zod_1.z.object({
            path: zod_1.z.string().describe('Campo com erro'),
            message: zod_1.z.string().describe('Mensagem detalhando o erro ocorrido'),
        })),
    }) }));
var ConflictTripResponseSchema = zod_1.z.object(__assign(__assign({}, structure_1.ResponseConflictStructure), { data: ErrorMessageSchema }));
// Definições de esquemas Fastify
exports.TripCreateSchema = {
    description: 'Criar uma nova viagem',
    tags: ['Trip'],
    body: trip_1.TripCreateRequestSchema,
    response: {
        200: SuccessTripResponseSchema.describe('Viagem criada com sucesso'),
        400: BadRequestTripResponseSchema.describe('Erro ao criar uma viagem'),
    },
};
exports.TripUpdateSchema = {
    description: 'Atualizar uma viagem',
    tags: ['Trip'],
    body: trip_1.TripUpdateRequestSchema,
    params: trip_2.UpdateTripParamsSchema,
    response: {
        200: SuccessTripResponseSchema.describe('Viagem atualizada com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        400: BadRequestTripResponseSchema.describe('Erro ao atualizar uma viagem'),
    },
};
exports.TripGetAllSchema = {
    description: 'Buscar todas as viagens',
    tags: ['Trip'],
    response: {
        200: SuccessTripsResponseSchema.describe('Viagens encontradas com sucesso'),
    },
};
exports.TripFindByIdSchema = {
    description: 'Buscar uma viagem pelo ID',
    params: trip_2.FindByIdTripParamsSchema,
    tags: ['Trip'],
    response: {
        200: SuccessTripResponseSchema.describe('Viagem encontrada com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
    },
};
exports.TripSendInviteSchema = {
    description: 'Enviar um convite para um usuário',
    params: trip_2.SendInviteTripParamsSchema,
    body: trip_1.TripSendInviteRequestSchema,
    tags: ['Trip'],
    response: {
        200: SuccessTripResponseSchema.describe('Convite enviado com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
    },
};
exports.TripAttendanceConfirmationSchema = {
    description: 'Confirmar a presença na viagem',
    params: trip_2.AttendanceConfirmationTripParamsSchema,
    body: trip_1.TripParticipantConfirmRequestSchema,
    tags: ['Participant'],
    response: {
        200: SuccessMessageResponseSchema.describe('Participante confirmado com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        429: ConflictTripResponseSchema.describe('Participante já confirmou a presença na viagem'),
    },
};
exports.TripRefuseInviteSchema = {
    description: 'Recusar o convite da viagem',
    params: trip_2.InviteRefuseTripParamsSchema,
    tags: ['Participant'],
    response: {
        200: SuccessMessageResponseSchema.describe('Convite recusado com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        429: ConflictTripResponseSchema.describe('Convite já foi recusado'),
    },
};
exports.TripRefuseSchema = {
    description: 'Cancelar uma viagem',
    params: trip_2.RefuseTripParamsSchema,
    tags: ['Trip'],
    response: {
        200: SuccessMessageResponseSchema.describe('Viagem cancelada com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        429: ConflictTripResponseSchema.describe('Viagem já foi cancelada'),
    },
};
exports.TripConfirmationSchema = {
    description: 'Confirmar uma viagem',
    params: trip_2.ConfirmationTripParamsSchema,
    tags: ['Trip'],
    response: {
        200: SuccessMessageResponseSchema.describe('Viagem confirmada com sucesso'),
        404: NotFoundTripResponseSchema.describe('Viagem não encontrada'),
        429: ConflictTripResponseSchema.describe('Viagem já foi confirmada'),
    },
};

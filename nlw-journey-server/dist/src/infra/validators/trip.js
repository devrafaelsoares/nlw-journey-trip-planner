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
exports.TripParticipantConfirmRequestSchema = exports.TripSendInviteRequestSchema = exports.TripUpdateRequestSchema = exports.TripCreateRequestSchema = void 0;
var zod_1 = require("zod");
var baseTripSchema = {
    destination: zod_1.z
        .string({ required_error: 'O campo "Destino" é obrigatório.' })
        .min(4, 'O destino deve ter pelo menos 4 caracteres.'),
    starts_at: zod_1.z.coerce.date({
        errorMap: function (issue, _a) {
            var defaultError = _a.defaultError;
            return ({
                message: issue.code === 'invalid_date' ? 'A data de início inválida ou não informada' : defaultError,
            });
        },
    }),
    ends_at: zod_1.z.coerce
        .date({
        errorMap: function (issue, _a) {
            var defaultError = _a.defaultError;
            return ({
                message: issue.code === 'invalid_date' ? 'A data de término inválida ou não informada' : defaultError,
            });
        },
    })
        .describe('Data e hora de término da viagem'),
};
exports.TripCreateRequestSchema = zod_1.z.object(__assign(__assign({}, baseTripSchema), { owner_name: zod_1.z.string({ required_error: 'O campo "Nome do organizador" é obrigatório.' }), owner_email: zod_1.z
        .string({ required_error: 'O campo "Email do organizador" é obrigatório.' })
        .email('O email fornecido é inválido.'), emails_to_invite: zod_1.z.array(zod_1.z.string().email('Um ou mais emails fornecidos são inválidos.')).optional() }), { required_error: 'Os dados para a criação da viagem são obrigatórios.' });
exports.TripUpdateRequestSchema = zod_1.z.object(__assign({}, baseTripSchema), { required_error: 'Os dados para a edição da viagem são obrigatórios.' });
exports.TripSendInviteRequestSchema = zod_1.z.object({
    guest_email: zod_1.z
        .string({ required_error: 'O campo "Email" é obrigatório.' })
        .email('Email inválido')
        .min(4, 'O email deve ter pelo menos 4 caracteres.'),
}, { required_error: 'Os dados para o envio do convite são obrigatórios.' });
exports.TripParticipantConfirmRequestSchema = zod_1.z.object({
    participant_name: zod_1.z.string({ required_error: 'O campo "Nome do participante" é obrigatório.' }),
}, { required_error: 'Os dados para o envio do convite são obrigatórios.' });

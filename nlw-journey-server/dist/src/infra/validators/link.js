"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripLinkUpdateRequestSchema = exports.TripLinkCreateRequestSchema = void 0;
var zod_1 = require("zod");
var baseLinkSchema = {
    url: zod_1.z
        .string({ required_error: 'O campo "URL" é obrigatório.' })
        .min(4, 'O título da URL deve ter pelo menos 4 caracteres.'),
    title: zod_1.z
        .string({ required_error: 'O campo "Título" é obrigatório.' })
        .min(4, 'O título da atividade deve ter pelo menos 4 caracteres.'),
};
exports.TripLinkCreateRequestSchema = zod_1.z.object(baseLinkSchema, {
    required_error: 'Os dados para a criação do link para viagem são obrigatórios.',
});
exports.TripLinkUpdateRequestSchema = zod_1.z.object(baseLinkSchema, {
    required_error: 'Os dados para a atualização do link para viagem são obrigatórios.',
});

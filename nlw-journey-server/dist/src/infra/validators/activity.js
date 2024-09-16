"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripActivityUpdateRequestSchema = exports.TripActivityCreateRequestSchema = void 0;
var zod_1 = require("zod");
var baseActivitySchema = {
    title: zod_1.z
        .string({ required_error: 'O campo "Título" é obrigatório.' })
        .min(4, 'O título da atividade deve ter pelo menos 4 caracteres.'),
    occurs_at: zod_1.z.coerce.date({
        errorMap: function (issue, _a) {
            var defaultError = _a.defaultError;
            return ({
                message: issue.code === 'invalid_date' ? 'A data da atividade é inválida ou não foi informada' : defaultError,
            });
        },
    }),
};
exports.TripActivityCreateRequestSchema = zod_1.z.object(baseActivitySchema, {
    required_error: 'Os dados para a criação da atividade para viagem são obrigatórios.',
});
exports.TripActivityUpdateRequestSchema = zod_1.z.object(baseActivitySchema, {
    required_error: 'Os dados para a atualização da atividade para viagem são obrigatórios.',
});

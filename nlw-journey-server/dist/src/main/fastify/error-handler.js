"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNotFoundHandler = exports.errorHandler = void 0;
var protocols_1 = require("../../presentation/protocols");
var zod_1 = require("zod");
var errorHandler = function (error, _request, reply) {
    if (error instanceof zod_1.ZodError) {
        return reply.status(protocols_1.HttpStatus.BAD_REQUEST).send({
            success: false,
            moment: new Date(),
            data: { errors: error.errors.map(function (_a) {
                    var path = _a.path, message = _a.message;
                    return ({ path: path[0], message: message });
                }) },
            statusCode: error.statusCode,
        });
    }
    if (error.statusCode === protocols_1.HttpStatus.TO_MANY_REQUESTS) {
        return reply.status(protocols_1.HttpStatus.TO_MANY_REQUESTS).send({
            success: false,
            moment: new Date(),
            data: { message: 'Muitas requisições feitas, por favor tente novamente mais tarde.' },
            statusCode: error.statusCode,
        });
    }
    return reply
        .status(protocols_1.HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, moment: new Date(), data: { errors: error.validation }, statusCode: error.statusCode });
};
exports.errorHandler = errorHandler;
var setNotFoundHandler = function (app) {
    app.setNotFoundHandler(function (_req, reply) {
        reply.code(protocols_1.HttpStatus.NOT_FOUND).send({
            success: false,
            moment: new Date(),
            data: { message: 'Rota não encontrada' },
            statusCode: protocols_1.HttpStatus.NOT_FOUND,
        });
    });
};
exports.setNotFoundHandler = setNotFoundHandler;

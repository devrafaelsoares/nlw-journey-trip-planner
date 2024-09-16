"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fastify_1 = __importDefault(require("fastify"));
var swagger_1 = __importDefault(require("@fastify/swagger"));
var swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
var routes_1 = __importDefault(require("../../infra/fastify/routes"));
var autoload_1 = __importDefault(require("@fastify/autoload"));
var rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
var cors_1 = __importDefault(require("@fastify/cors"));
var fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
var error_handler_1 = require("./error-handler");
var swagger_2 = require("./swagger");
var rate_limit_2 = require("./rate-limit");
var app = (0, fastify_1.default)();
app.register(autoload_1.default, {
    dir: path_1.default.join(__dirname, 'plugins'),
});
app.register(cors_1.default, { origin: '*' });
app.setErrorHandler(error_handler_1.errorHandler);
(0, error_handler_1.setNotFoundHandler)(app);
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(rate_limit_1.default, rate_limit_2.rateLimitOptions);
app.register(swagger_1.default, swagger_2.swaggerOptions);
app.register(swagger_ui_1.default, swagger_2.swaggerUiOptions);
app.register(routes_1.default);
exports.default = app;

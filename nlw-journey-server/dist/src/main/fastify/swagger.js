"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiOptions = exports.swaggerOptions = void 0;
var fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
exports.swaggerOptions = {
    swagger: {
        info: {
            title: 'Agendador de Viagem - Planeje e Compartilhe suas Aventuras',
            description: 'Crie viagens personalizadas e convide participantes, como amigos e familiares, para compartilhar momentos especiais. Organize atividades detalhadas e adicione links importantes, como hotéis e restaurantes, para facilitar sua experiência de viagem.',
            version: '1.0.0',
            contact: {
                name: 'devrafaelsoares',
                email: 'rafael.soares.developer@gmail.com',
                url: 'https://devrafaelsoares.vercel.app',
            },
        },
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    transform: fastify_type_provider_zod_1.jsonSchemaTransform,
};
exports.swaggerUiOptions = {
    routePrefix: '/docs',
    theme: { title: 'Pann.er' },
    logo: { content: (0, fs_1.readFileSync)(path_1.default.resolve('public/panner-primary-logo.png')), type: 'image/png' },
};

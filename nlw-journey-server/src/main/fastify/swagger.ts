import { SwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { readFileSync } from 'fs';
import path from 'path';

export const swaggerOptions: SwaggerOptions = {
    swagger: {
        info: {
            title: 'Agendador de Viagem - Planeje e Compartilhe suas Aventuras',
            description:
                'Crie viagens personalizadas e convide participantes, como amigos e familiares, para compartilhar momentos especiais. Organize atividades detalhadas e adicione links importantes, como hotéis e restaurantes, para facilitar sua experiência de viagem.',
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
    transform: jsonSchemaTransform,
};

export const swaggerUiOptions: FastifySwaggerUiOptions = {
    routePrefix: '/docs',
    theme: { title: 'Pann.er' },
    logo: { content: readFileSync(path.resolve('public/panner-primary-logo.png')), type: 'image/png' },
};

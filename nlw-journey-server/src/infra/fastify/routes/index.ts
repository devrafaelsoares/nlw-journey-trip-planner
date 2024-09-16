import { FastifyInstance, RegisterOptions } from 'fastify';

import tripRoutes from './trip';

export default async function routes(fastify: FastifyInstance, options: RegisterOptions) {
    fastify.register(tripRoutes, options);
}

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller } from '@presentation/protocols/controller';
import { HttpStatus } from '../protocols';

export function fastifyAdapterRoute(controller: Controller<FastifyRequest, FastifyReply>) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
        const response = await controller.handle(req, reply);

        if (response.statusCode === HttpStatus.CREATED && response.headers) {
            const location = response.headers['location'];
            reply.header('location', location);
        }

        delete response.headers;

        reply.status(response.statusCode).send(response);
    };
}

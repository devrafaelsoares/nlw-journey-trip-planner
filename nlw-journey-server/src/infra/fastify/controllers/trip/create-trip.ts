import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { CreateTripUseCase } from '@domain/usecases/trip';
import { CreateTripRequestProps } from '@presentation/adpaters/trip';

export class CreateTripControllerFastify implements Controller<FastifyRequest> {
    constructor(private createTripUseCase: CreateTripUseCase) {}

    async handle(request: FastifyRequest<{ Body: CreateTripRequestProps }>): Promise<HttpResponse> {
        const body = request.body;

        const createdTripResult = await this.createTripUseCase.execute(body);

        if (createdTripResult.isError()) {
            const errors = createdTripResult.value;
            return { success: false, moment: new Date(), data: { errors }, statusCode: HttpStatus.BAD_REQUEST };
        }

        const {
            value: { ...trip },
        } = createdTripResult;

        return {
            success: true,
            moment: new Date(),
            data: { trip },
            statusCode: HttpStatus.CREATED,
        };
    }
}

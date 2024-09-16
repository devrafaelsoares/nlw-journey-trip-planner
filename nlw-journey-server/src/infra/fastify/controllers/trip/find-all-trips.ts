import { FindAllTripsUseCase } from '@domain/usecases/trip';
import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';

export class FindAllTripsControllerFastify implements Controller<FastifyRequest> {
    constructor(private findAllTripsUseCase: FindAllTripsUseCase) {}
    async handle(_request: FastifyRequest): Promise<HttpResponse> {
        const findAllTripsResult = await this.findAllTripsUseCase.execute();

        const trips = findAllTripsResult;

        return {
            success: true,
            moment: new Date(),
            data: { trips },
            statusCode: HttpStatus.OK,
        };
    }
}

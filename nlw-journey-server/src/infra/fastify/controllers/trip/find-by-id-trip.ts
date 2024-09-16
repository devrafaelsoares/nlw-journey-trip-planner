import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { FindByIdTripParamsProps } from '@presentation/adpaters/trip';
import { FindByIdTripUseCase } from '@domain/usecases/trip';

export class FindByIdTripControllerFastify implements Controller<FastifyRequest> {
    constructor(private findByIdTripUseCase: FindByIdTripUseCase) {}

    async handle(request: FastifyRequest<{ Params: FindByIdTripParamsProps }>): Promise<HttpResponse> {
        const { id } = request.params;

        const foundTripResult = await this.findByIdTripUseCase.execute(id);

        if (foundTripResult.isError()) {
            const { message, statusCode } = foundTripResult.value;

            return { success: false, moment: new Date(), data: { message }, statusCode };
        }

        const {
            value: { ...trip },
        } = foundTripResult;

        return {
            success: true,
            moment: new Date(),
            data: { trip },
            statusCode: HttpStatus.OK,
        };
    }
}

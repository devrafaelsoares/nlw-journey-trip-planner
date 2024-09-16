import { FindByIdActivitysAndTripParamsProps } from '@presentation/adpaters';
import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { FindByIdActivityAndTripUseCase } from '@domain/usecases/activity';

export class FindByIdActivityAndTripControllerFastify implements Controller<FastifyRequest> {
    constructor(private findByIdActivityAndTripUseCase: FindByIdActivityAndTripUseCase) {}
    async handle(request: FastifyRequest<{ Params: FindByIdActivitysAndTripParamsProps }>): Promise<HttpResponse> {
        const { activityId, tripId } = request.params;

        const findByIdActivityAndTripResult = await this.findByIdActivityAndTripUseCase.execute(tripId, activityId);

        if (findByIdActivityAndTripResult.isError()) {
            const value = findByIdActivityAndTripResult.value;
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return { success: false, moment: new Date(), data: value, statusCode: HttpStatus.BAD_REQUEST };
        }

        const activity = findByIdActivityAndTripResult.value;

        return {
            success: true,
            moment: new Date(),
            data: { activity },
            statusCode: HttpStatus.OK,
        };
    }
}

import { FindAllActivitiesByTripParamsProps } from '@presentation/adpaters';
import { FindAllActivitiesByTripUseCase } from '@domain/usecases/activity';
import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';

export class FindAllActivitiesByTripControllerFastify implements Controller<FastifyRequest> {
    constructor(private findAllActivitiesByTripUseCase: FindAllActivitiesByTripUseCase) {}
    async handle(request: FastifyRequest<{ Params: FindAllActivitiesByTripParamsProps }>): Promise<HttpResponse> {
        const { id } = request.params;
        const findAllActivitiesByTripResult = await this.findAllActivitiesByTripUseCase.execute(id);

        if (findAllActivitiesByTripResult.isError()) {
            const value = findAllActivitiesByTripResult.value;
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return { success: false, moment: new Date(), data: value, statusCode: HttpStatus.BAD_REQUEST };
        }

        const activities = findAllActivitiesByTripResult.value;

        return {
            success: true,
            moment: new Date(),
            data: { activities },
            statusCode: HttpStatus.OK,
        };
    }
}

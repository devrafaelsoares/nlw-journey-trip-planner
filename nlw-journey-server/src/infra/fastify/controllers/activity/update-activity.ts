import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { UpdateActivityUseCase } from '@domain/usecases/activity';
import { UpdateActivityParamsProps, UpdateActivityRequestProps } from '@presentation/adpaters';

export class UpdateActivityControllerFastify implements Controller<FastifyRequest> {
    constructor(private updatedActivityUseCase: UpdateActivityUseCase) {}

    async handle(
        request: FastifyRequest<{ Body: UpdateActivityRequestProps; Params: UpdateActivityParamsProps }>
    ): Promise<HttpResponse> {
        const { activityId, tripId } = request.params;

        const body = request.body;

        const updatedActivityResult = await this.updatedActivityUseCase.execute(tripId, activityId, body);

        if (updatedActivityResult.isError()) {
            const value = updatedActivityResult.value;
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return {
                success: false,
                moment: new Date(),
                data: { value },
                statusCode: HttpStatus.BAD_REQUEST,
            };
        }

        const {
            value: { ...activity },
        } = updatedActivityResult;

        return {
            success: true,
            moment: new Date(),
            data: { activity },
            statusCode: HttpStatus.OK,
        };
    }
}

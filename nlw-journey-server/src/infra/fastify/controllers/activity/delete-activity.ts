import { DeleteActivityUseCase } from '@domain/usecases/activity';
import { DeleteActivityParamsProps } from '@presentation/adpaters';
import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';

export class DeleteActivityControllerFastify implements Controller<FastifyRequest> {
    constructor(private deleteActivityUseCase: DeleteActivityUseCase) {}

    async handle(request: FastifyRequest<{ Params: DeleteActivityParamsProps }>): Promise<HttpResponse> {
        const { activityId, tripId } = request.params;

        const deletedActivityResult = await this.deleteActivityUseCase.execute(tripId, activityId);

        if (deletedActivityResult.isError()) {
            const value = deletedActivityResult.value;
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return { success: false, moment: new Date(), data: value, statusCode: HttpStatus.BAD_REQUEST };
        }

        return {
            success: true,
            moment: new Date(),
            data: null,
            statusCode: HttpStatus.OK,
        };
    }
}

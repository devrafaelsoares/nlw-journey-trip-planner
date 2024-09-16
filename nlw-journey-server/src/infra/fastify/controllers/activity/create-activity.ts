import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { CreateActivityUseCase } from '@domain/usecases/activity';
import { CreateActivityRequestProps, CreateActivityParamsProps } from '@presentation/adpaters';

export class CreateActivityControllerFastify implements Controller<FastifyRequest> {
    constructor(private createActivityUseCase: CreateActivityUseCase) {}

    async handle(
        request: FastifyRequest<{ Body: CreateActivityRequestProps; Params: CreateActivityParamsProps }>
    ): Promise<HttpResponse> {
        const id = request.params.id;
        const body = request.body;

        const createdTripResult = await this.createActivityUseCase.execute(body, id);

        if (createdTripResult.isError()) {
            const value = createdTripResult.value;
            console.log(value);
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return { success: false, moment: new Date(), data: { value }, statusCode: HttpStatus.BAD_REQUEST };
        }

        const {
            value: { ...activity },
        } = createdTripResult;

        return {
            success: true,
            moment: new Date(),
            data: { activity },
            statusCode: HttpStatus.OK,
        };
    }
}

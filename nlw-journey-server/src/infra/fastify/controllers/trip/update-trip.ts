import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { UpdateTripParamsProps, UpdateTripRequestProps } from '@presentation/adpaters/trip';
import { UpdateTripUseCase } from '@domain/usecases/trip';

export class UpdateTripControllerFastify implements Controller<FastifyRequest> {
    constructor(private updatedTripUseCase: UpdateTripUseCase) {}

    async handle(
        request: FastifyRequest<{ Body: UpdateTripRequestProps; Params: UpdateTripParamsProps }>
    ): Promise<HttpResponse> {
        const id = request.params.id;

        const body = request.body;

        const updatedTripResult = await this.updatedTripUseCase.execute(id, body);

        if (updatedTripResult.isError()) {
            const value = updatedTripResult.value;
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
            value: { ...trip },
        } = updatedTripResult;

        return {
            success: true,
            moment: new Date(),
            data: { trip },
            statusCode: HttpStatus.OK,
        };
    }
}

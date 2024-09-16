import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { ConfirmTripParamsProps } from '@presentation/adpaters/trip';
import { ConfirmTripUseCase } from '@domain/usecases/trip';

export class ConfirmTripControllerFastify implements Controller<FastifyRequest> {
    constructor(private confirmTripUseCase: ConfirmTripUseCase) {}

    async handle(request: FastifyRequest<{ Params: ConfirmTripParamsProps }>): Promise<HttpResponse> {
        const { id } = request.params;

        const confirmTripResult = await this.confirmTripUseCase.execute(id);

        if (confirmTripResult.isError()) {
            const { message, statusCode } = confirmTripResult.value;
            return { success: false, moment: new Date(), data: { message }, statusCode };
        }

        return {
            success: true,
            moment: new Date(),
            data: { message: 'Viagem confirmada com sucesso' },
            statusCode: HttpStatus.OK,
        };
    }
}

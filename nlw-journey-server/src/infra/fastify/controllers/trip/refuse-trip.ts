import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { RefuseTripParamsProps } from '@presentation/adpaters/trip';
import { RefuseTripUseCase } from '@domain/usecases/trip/refuse-trip';

export class RefuseTripControllerFastify implements Controller<FastifyRequest> {
    constructor(private refuseTripUseCase: RefuseTripUseCase) {}

    async handle(request: FastifyRequest<{ Params: RefuseTripParamsProps }>): Promise<HttpResponse> {
        const { id } = request.params;

        const refuseTripResult = await this.refuseTripUseCase.execute(id);

        if (refuseTripResult.isError()) {
            const { message, statusCode } = refuseTripResult.value;
            return { success: false, moment: new Date(), data: { message }, statusCode };
        }

        return {
            success: true,
            moment: new Date(),
            data: { message: 'Viagem cancelada com sucesso' },
            statusCode: HttpStatus.OK,
        };
    }
}

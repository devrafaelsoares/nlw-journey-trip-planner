import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { RefuseTripInviteParamsProps } from '@presentation/adpaters/trip';
import { RefuseTripInviteUseCase } from '@domain/usecases/trip';

export class RefuseTripInviteControllerFastify implements Controller<FastifyRequest> {
    constructor(private refuseTripInviteUseCase: RefuseTripInviteUseCase) {}

    async handle(request: FastifyRequest<{ Params: RefuseTripInviteParamsProps }>): Promise<HttpResponse> {
        const { tripId, participantId } = request.params;

        const refuseTripInviteResult = await this.refuseTripInviteUseCase.execute(tripId, participantId);

        if (refuseTripInviteResult.isError()) {
            const { message, statusCode } = refuseTripInviteResult.value;
            return { success: false, moment: new Date(), data: { message }, statusCode };
        }

        return {
            success: true,
            moment: new Date(),
            data: { message: 'Convite recusado com sucesso' },
            statusCode: HttpStatus.OK,
        };
    }
}

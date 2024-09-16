import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { ConfirmParticipantTrip, ConfirmTripInviteParamsProps } from '@presentation/adpaters/trip';
import { ConfirmTripInviteUseCase } from '@domain/usecases/trip';

export class ConfirmTripInviteControllerFastify implements Controller<FastifyRequest> {
    constructor(private confirmTripInviteUseCase: ConfirmTripInviteUseCase) {}

    async handle(
        request: FastifyRequest<{ Body: ConfirmParticipantTrip; Params: ConfirmTripInviteParamsProps }>
    ): Promise<HttpResponse> {
        const { tripId, participantId } = request.params;
        const { participant_name } = request.body;

        const confirmParticipantResult = await this.confirmTripInviteUseCase.execute(
            tripId,
            participantId,
            participant_name
        );

        if (confirmParticipantResult.isError()) {
            const { message, statusCode } = confirmParticipantResult.value;
            return { success: false, moment: new Date(), data: { message }, statusCode };
        }

        return {
            success: true,
            moment: new Date(),
            data: { message: 'Presença confirmada com sucesso' },
            statusCode: HttpStatus.OK,
        };
    }
}

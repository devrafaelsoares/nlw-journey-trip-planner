import { SendTripInviteUseCase } from '@domain/usecases/trip';
import { SendTripInviteParamsProps, SendTripInviteRequestProps } from '@presentation/adpaters/trip';
import { Controller, HttpResponse, HttpStatus } from '@presentation/protocols';
import { FastifyRequest } from 'fastify';

export class SendTripInviteControllerFastify implements Controller<FastifyRequest> {
    constructor(private sendInviteUseCase: SendTripInviteUseCase) {}

    async handle(
        request: FastifyRequest<{ Params: SendTripInviteParamsProps; Body: SendTripInviteRequestProps }>
    ): Promise<HttpResponse> {
        const tripId = request.params.id;
        const guestEmail = request.body.guest_email;

        const foundTripResult = await this.sendInviteUseCase.execute(tripId, guestEmail);

        if (foundTripResult.isError()) {
            const value = foundTripResult.value;
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return { success: false, moment: new Date(), data: { errors: value }, statusCode: HttpStatus.BAD_REQUEST };
        }

        const {
            value: { ...trip },
        } = foundTripResult;

        return {
            success: true,
            moment: new Date(),
            data: { trip },
            statusCode: HttpStatus.OK,
        };
    }
}

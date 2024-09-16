import { FindByIdLinksAndTripParamsProps } from '@presentation/adpaters';
import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { FindByIdLinkAndTripUseCase } from '@domain/usecases/link/find-by-id-and-trip';

export class FindByIdLinkAndTripControllerFastify implements Controller<FastifyRequest> {
    constructor(private findByIdAndTripUseCase: FindByIdLinkAndTripUseCase) {}
    async handle(request: FastifyRequest<{ Params: FindByIdLinksAndTripParamsProps }>): Promise<HttpResponse> {
        const { linkId, tripId } = request.params;

        const findByIdLinkAndTripResult = await this.findByIdAndTripUseCase.execute(tripId, linkId);

        if (findByIdLinkAndTripResult.isError()) {
            const value = findByIdLinkAndTripResult.value;
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return { success: false, moment: new Date(), data: value, statusCode: HttpStatus.BAD_REQUEST };
        }

        const link = findByIdLinkAndTripResult.value;

        return {
            success: true,
            moment: new Date(),
            data: { link },
            statusCode: HttpStatus.OK,
        };
    }
}

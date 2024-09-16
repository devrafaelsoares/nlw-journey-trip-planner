import { FindAllLinksByTripParamsProps } from '@presentation/adpaters';
import { FindAllLinksByTripUseCase } from '@domain/usecases/link/find-all-by-trip';
import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';

export class FindAllLinksByTripControllerFastify implements Controller<FastifyRequest> {
    constructor(private findAllLinksByTripUseCase: FindAllLinksByTripUseCase) {}
    async handle(request: FastifyRequest<{ Params: FindAllLinksByTripParamsProps }>): Promise<HttpResponse> {
        const { id } = request.params;

        const findAllLinksByTripResult = await this.findAllLinksByTripUseCase.execute(id);

        if (findAllLinksByTripResult.isError()) {
            const value = findAllLinksByTripResult.value;
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return { success: false, moment: new Date(), data: value, statusCode: HttpStatus.BAD_REQUEST };
        }

        const links = findAllLinksByTripResult.value;

        return {
            success: true,
            moment: new Date(),
            data: { links },
            statusCode: HttpStatus.OK,
        };
    }
}

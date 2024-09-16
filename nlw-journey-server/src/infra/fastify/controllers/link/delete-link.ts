import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { DeleteLinkParamsProps } from '@presentation/adpaters';
import { DeleteLinkUseCase } from '@domain/usecases/link/delete-link';

export class DeleteLinkControllerFastify implements Controller<FastifyRequest> {
    constructor(private deleteLinkUseCase: DeleteLinkUseCase) {}

    async handle(request: FastifyRequest<{ Params: DeleteLinkParamsProps }>): Promise<HttpResponse> {
        const { tripId, linkId } = request.params;

        const deletedLinkResult = await this.deleteLinkUseCase.execute(linkId, tripId);

        if (deletedLinkResult.isError()) {
            const value = deletedLinkResult.value;
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

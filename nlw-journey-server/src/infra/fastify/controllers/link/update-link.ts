import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { UpdateLinkUseCase } from '@domain/usecases/link';
import { UpdateLinkParamsProps, UpdateLinkRequestProps } from '@presentation/adpaters';

export class UpdateLinkControllerFastify implements Controller<FastifyRequest> {
    constructor(private updatedLinkUseCase: UpdateLinkUseCase) {}

    async handle(
        request: FastifyRequest<{ Body: UpdateLinkRequestProps; Params: UpdateLinkParamsProps }>
    ): Promise<HttpResponse> {
        const { linkId, tripId } = request.params;

        const body = request.body;

        const updatedLinkResult = await this.updatedLinkUseCase.execute(tripId, linkId, body);

        if (updatedLinkResult.isError()) {
            const value = updatedLinkResult.value;
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return {
                success: false,
                moment: new Date(),
                data: value,
                statusCode: HttpStatus.BAD_REQUEST,
            };
        }

        const {
            value: { ...link },
        } = updatedLinkResult;

        return {
            success: true,
            moment: new Date(),
            data: { link },
            statusCode: HttpStatus.OK,
        };
    }
}

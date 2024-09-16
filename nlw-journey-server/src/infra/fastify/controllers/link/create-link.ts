import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';
import { CreateLinkParamsProps, CreateLinkRequestProps } from '@presentation/adpaters';
import { CreateLinkUseCase } from '@domain/usecases/link';

export class CreateLinkControllerFastify implements Controller<FastifyRequest> {
    constructor(private createLinkUseCase: CreateLinkUseCase) {}

    async handle(
        request: FastifyRequest<{ Body: CreateLinkRequestProps; Params: CreateLinkParamsProps }>
    ): Promise<HttpResponse> {
        const id = request.params.id;
        const body = request.body;

        const createdTripResult = await this.createLinkUseCase.execute(body, id);

        if (createdTripResult.isError()) {
            const value = createdTripResult.value;
            if (value instanceof Error) {
                const { message, statusCode } = value;
                return { success: false, moment: new Date(), data: { message }, statusCode };
            }

            return { success: false, moment: new Date(), data: value, statusCode: HttpStatus.BAD_REQUEST };
        }

        const {
            value: { ...link },
        } = createdTripResult;

        return {
            success: true,
            moment: new Date(),
            data: { link },
            statusCode: HttpStatus.OK,
        };
    }
}

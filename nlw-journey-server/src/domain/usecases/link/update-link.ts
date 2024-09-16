import { Either, error, success } from '@/helpers';
import { LinkRepository, TripRepository } from '@domain/protocols/repositories';
import { Link, LinkProps, LinkPropsCreate } from '@domain/entities';
import { ErrorMessages, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { LinkResponseProps, UpdateLinkRequestProps } from '@presentation/adpaters';
import { LinkMapper } from '@domain/mappers/link';
import { ValidationError, Validator } from '@domain/validators/protocols';

export class UpdateLinkUseCase {
    constructor(
        private tripRepository: TripRepository,
        private linkRepository: LinkRepository,
        private linkValidator: Validator<LinkPropsCreate>
    ) {}

    async execute(
        tripId: string,
        linkId: string,
        data: UpdateLinkRequestProps
    ): Promise<Either<ValidationError<LinkProps>[] | NotFoundEntityError, LinkResponseProps>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const foundLink = foundTrip.links.find(link => link.id === linkId);

        if (!foundLink) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_ACTIVITY, HttpStatus.NOT_FOUND));
        }

        const dataLinkResult = LinkMapper.toDomainWithValidation(data, this.linkValidator);

        if (dataLinkResult.isError()) {
            return error(dataLinkResult.value);
        }

        const dataLink = dataLinkResult.value;

        foundLink.title = dataLink.title;
        foundLink.url = dataLink.url;

        const updatedLink = await this.linkRepository.save(foundLink);

        return success(LinkMapper.toHttpResponse(updatedLink as Link));
    }
}

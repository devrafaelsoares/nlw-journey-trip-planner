import { Either, error, success } from '@/helpers';
import { ErrorMessages, ExistsEntityError, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { LinkProps, LinkPropsCreate, TripPropsCreate } from '@domain/entities';
import { TripRepository } from '@domain/protocols/repositories';
import { ValidationError, Validator } from '@domain/validators/protocols';
import { LinkRepository } from '@domain/protocols/repositories';
import { CreateLinkRequestProps, LinkResponseProps } from '@presentation/adpaters';
import { LinkMapper } from '@domain/mappers/link';

export class CreateLinkUseCase {
    constructor(
        private tripRepository: TripRepository,
        private linkRepository: LinkRepository,
        private linkValidator: Validator<LinkPropsCreate>
    ) {}
    async execute(
        data: CreateLinkRequestProps,
        tripId: string
    ): Promise<
        Either<
            ValidationError<LinkProps>[] | ValidationError<TripPropsCreate>[] | NotFoundEntityError,
            LinkResponseProps
        >
    > {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const foundLink = await this.linkRepository.findByTitle(data.title);

        if (foundLink) {
            return error(new ExistsEntityError(ErrorMessages.EXISITS_LINK, HttpStatus.CONFLIT));
        }

        const linkResult = LinkMapper.toDomainWithValidation(data, this.linkValidator);

        if (linkResult.isError()) {
            return error(linkResult.value);
        }

        const link = linkResult.value;

        const tripLinkResult = foundTrip.addLinks(link);

        if (tripLinkResult.isError()) {
            return error(tripLinkResult.value);
        }

        const createLink = await this.linkRepository.createAndTripConnect(link, tripId);

        return success(LinkMapper.toHttpResponse(createLink));
    }
}

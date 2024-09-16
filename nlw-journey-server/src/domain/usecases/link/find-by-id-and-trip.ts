import { Either, error, success } from '@/helpers';
import { LinkResponseProps } from '@presentation/adpaters';
import { NotFoundEntityError, ErrorMessages } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { TripRepository } from '@domain/protocols/repositories';
import { LinkMapper } from '@domain/mappers/link';

export class FindByIdLinkAndTripUseCase {
    constructor(private tripRepository: TripRepository) {}

    async execute(tripId: string, linkId: string): Promise<Either<NotFoundEntityError, LinkResponseProps>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const link = foundTrip.links.find(link => link.id === linkId);

        if (!link) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_LINK, HttpStatus.NOT_FOUND));
        }

        return success(LinkMapper.toHttpResponse(link));
    }
}

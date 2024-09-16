import { TripRepository } from '@domain/protocols/repositories';
import { Either, error, success } from '@/helpers';
import { ErrorMessages, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { LinkMapper } from '@domain/mappers/link';
import { LinkResponseProps } from '@presentation/adpaters';

export class FindAllLinksByTripUseCase {
    constructor(private tripRepository: TripRepository) {}

    async execute(tripId: string): Promise<Either<NotFoundEntityError, LinkResponseProps[]>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const links = foundTrip.links.map(LinkMapper.toHttpResponse);

        return success(links);
    }
}

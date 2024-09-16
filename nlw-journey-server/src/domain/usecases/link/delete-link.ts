import { Either, error, success } from '@/helpers';
import { ErrorMessages, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { TripRepository } from '@domain/protocols/repositories';
import { LinkRepository } from '@domain/protocols/repositories';

export class DeleteLinkUseCase {
    constructor(private tripRepository: TripRepository, private linkRepository: LinkRepository) {}
    async execute(id: string, tripId: string): Promise<Either<NotFoundEntityError, undefined>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const foundLink = foundTrip.links.find(link => link.id === id);

        if (!foundLink) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_LINK, HttpStatus.NOT_FOUND));
        }

        await this.linkRepository.delete(foundLink.id);

        return success(undefined);
    }
}

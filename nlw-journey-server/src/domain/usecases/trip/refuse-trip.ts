import { TripRepository } from '@domain/protocols/repositories';
import { Either, error, success } from '@/helpers';
import { NotFoundEntityError, ErrorMessages } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';

export class RefuseTripUseCase {
    constructor(private tripRepository: TripRepository) {}

    async execute(tripId: string): Promise<Either<NotFoundEntityError, undefined>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        await this.tripRepository.delete(foundTrip.id);

        return success(undefined);
    }
}

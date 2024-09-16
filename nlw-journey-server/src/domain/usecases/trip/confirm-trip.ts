import { Either, error, success } from '@/helpers';
import { ErrorMessages, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { TripRepository } from '@domain/protocols/repositories';
import { TripConfirmedError } from '@presentation/errors/trip/confirmed-trip';

export class ConfirmTripUseCase {
    constructor(private tripRepository: TripRepository) {}
    async execute(id: string): Promise<Either<NotFoundEntityError, void>> {
        const tripFound = await this.tripRepository.findById(id);

        if (!tripFound) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        if (tripFound.isConfirmed) {
            return error(new TripConfirmedError(ErrorMessages.CONFIRMED_TRIP, HttpStatus.CONFLIT));
        }

        tripFound.confirm();

        await this.tripRepository.save(tripFound);

        return success(undefined);
    }
}

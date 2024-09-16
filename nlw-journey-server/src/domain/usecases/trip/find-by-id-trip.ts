import { Either, error, success } from '@/helpers';
import { TripResponseProps } from '@presentation/adpaters/trip';
import { TripRepository } from '@domain/protocols/repositories';
import { TripMapper } from '@domain/mappers/trip';
import { ErrorMessages, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';

export class FindByIdTripUseCase {
    constructor(private tripRepository: TripRepository) {}
    async execute(id: string): Promise<Either<NotFoundEntityError, TripResponseProps>> {
        const foundTrip = await this.tripRepository.findById(id);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        return success(TripMapper.toHttpResponse(foundTrip));
    }
}

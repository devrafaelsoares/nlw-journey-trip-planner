import { TripRepository } from '@domain/protocols/repositories';
import { Either, error, success } from '@/helpers';
import { ErrorMessages, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { ActivityResponseProps } from '@presentation/adpaters';
import { ActivityMapper } from '@domain/mappers/activity';

export class FindAllActivitiesByTripUseCase {
    constructor(private tripRepository: TripRepository) {}

    async execute(tripId: string): Promise<Either<NotFoundEntityError, ActivityResponseProps[]>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const activities = foundTrip.activities.map(ActivityMapper.toHttpResponse);

        return success(activities);
    }
}

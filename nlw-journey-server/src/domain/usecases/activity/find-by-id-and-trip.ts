import { Either, error, success } from '@/helpers';
import { ActivityResponseProps } from '@presentation/adpaters';
import { NotFoundEntityError, ErrorMessages } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { TripRepository } from '@domain/protocols/repositories';
import { ActivityMapper } from '@domain/mappers/activity';

export class FindByIdActivityAndTripUseCase {
    constructor(private tripRepository: TripRepository) {}

    async execute(tripId: string, activityId: string): Promise<Either<NotFoundEntityError, ActivityResponseProps>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const activity = foundTrip.activities.find(activity => activity.id === activityId);

        if (!activity) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_LINK, HttpStatus.NOT_FOUND));
        }

        return success(ActivityMapper.toHttpResponse(activity));
    }
}

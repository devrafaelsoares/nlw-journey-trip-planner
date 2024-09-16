import { Either, error, success } from '@/helpers';
import { ErrorMessages, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { ActivityRepository, TripRepository } from '@domain/protocols/repositories';

export class DeleteActivityUseCase {
    constructor(private tripRepository: TripRepository, private activityRepository: ActivityRepository) {}

    async execute(tripId: string, activityId: string): Promise<Either<NotFoundEntityError, undefined>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const foundActivity = foundTrip.activities.find(activity => activity.id === activityId);

        if (!foundActivity) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_ACTIVITY, HttpStatus.NOT_FOUND));
        }

        await this.activityRepository.delete(foundActivity.id);

        return success(undefined);
    }
}

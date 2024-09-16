import { Either, error, success } from '@/helpers';
import { ActivityRepository, TripRepository } from '@domain/protocols/repositories';
import { Activity, ActivityProps, ActivityPropsCreate } from '@domain/entities';
import { ErrorMessages, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { ActivityResponseProps, UpdateActivityRequestProps } from '@presentation/adpaters';
import { ActivityMapper } from '@domain/mappers/activity';
import { ValidationError, Validator } from '@domain/validators/protocols';

export class UpdateActivityUseCase {
    constructor(
        private tripRepository: TripRepository,
        private activityRepository: ActivityRepository,
        private activityValidator: Validator<ActivityPropsCreate>
    ) {}

    async execute(
        tripId: string,
        activityId: string,
        data: UpdateActivityRequestProps
    ): Promise<Either<ValidationError<ActivityProps>[] | NotFoundEntityError, ActivityResponseProps>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const foundActivity = foundTrip.activities.find(activity => activity.id === activityId);

        if (!foundActivity) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_ACTIVITY, HttpStatus.NOT_FOUND));
        }

        const dataActivityResult = ActivityMapper.toDomainWithValidation(data, this.activityValidator);

        if (dataActivityResult.isError()) {
            return error(dataActivityResult.value);
        }

        const dataActivity = dataActivityResult.value;

        foundActivity.title = dataActivity.title;
        foundActivity.occursAt = dataActivity.occursAt;

        const updatedTrip = await this.activityRepository.save(foundActivity);

        return success(ActivityMapper.toHttpResponse(updatedTrip as Activity));
    }
}

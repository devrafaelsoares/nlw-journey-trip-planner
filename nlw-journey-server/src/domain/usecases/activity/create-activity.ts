import { Either, error, success } from '@/helpers';
import { ErrorMessages, ExistsEntityError, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { ActivityProps, ActivityPropsCreate, TripPropsCreate } from '@domain/entities';
import { TripRepository } from '@domain/protocols/repositories';
import { ActivityRepository } from '@domain/protocols/repositories';
import { ValidationError, Validator } from '@domain/validators/protocols';
import { CreateActivityRequestProps } from '@presentation/adpaters/activity';
import { ActivityMapper } from '@domain/mappers/activity';

export class CreateActivityUseCase {
    constructor(
        private tripRepository: TripRepository,
        private activityRepository: ActivityRepository,
        private activityValidator: Validator<ActivityPropsCreate>
    ) {}
    async execute(
        data: CreateActivityRequestProps,
        tripId: string
    ): Promise<
        Either<
            ValidationError<ActivityProps>[] | ValidationError<TripPropsCreate>[] | NotFoundEntityError,
            ActivityMapper
        >
    > {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const foundActivity = await this.activityRepository.findByTitleAndOccursAt(data.title, data.occurs_at);

        if (foundActivity) {
            return error(new ExistsEntityError(ErrorMessages.EXISTS_ACTIVITY, HttpStatus.CONFLIT));
        }

        const activityResult = ActivityMapper.toDomainWithValidation(data, this.activityValidator);

        if (activityResult.isError()) {
            return error(activityResult.value);
        }

        const activity = activityResult.value;

        const tripActivityResult = foundTrip.addActivity(activity);

        if (tripActivityResult.isError()) {
            return error(tripActivityResult.value);
        }

        const createdActivity = await this.activityRepository.createAndTripConnect(activity, tripId);

        return success(ActivityMapper.toHttpResponse(createdActivity));
    }
}

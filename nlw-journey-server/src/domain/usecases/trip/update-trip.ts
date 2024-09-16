import { Either, error, success } from '@/helpers';
import { TripResponseProps, UpdateTripRequestProps } from '@presentation/adpaters/trip';
import { TripRepository } from '@domain/protocols/repositories';
import { TripMapper } from '@domain/mappers/trip';
import { ValidationError } from '@domain/validators/protocols';
import { ParticipantProps, Trip, TripPropsCreate } from '@domain/entities';
import { ErrorMessages, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';

export class UpdateTripUseCase {
    constructor(private tripRepository: TripRepository) {}

    async execute(
        id: string,
        data: UpdateTripRequestProps
    ): Promise<
        Either<
            ValidationError<ParticipantProps>[] | ValidationError<TripPropsCreate>[] | NotFoundEntityError,
            TripResponseProps
        >
    > {
        const foundTrip = await this.tripRepository.findById(id);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        foundTrip.destination = data.destination;
        foundTrip.startsAt = data.starts_at;
        foundTrip.endsAt = data.ends_at;

        const updatedTrip = await this.tripRepository.save(foundTrip);

        return success(TripMapper.toHttpResponse(updatedTrip as Trip));
    }
}

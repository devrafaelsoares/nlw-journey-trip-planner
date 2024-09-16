import { Either, error, success } from '@/helpers';
import { CreateTripRequestProps, TripResponseProps } from '@presentation/adpaters/trip';
import { TripRepository } from '@domain/protocols/repositories';
import { TripMapper } from '@domain/mappers/trip';
import { ValidationError, Validator } from '@domain/validators/protocols';
import { ParticipantProps, ParticipantPropsCreate, TripPropsCreate } from '@domain/entities';
import { SendingEmailTripCreate } from '@domain/usecases/email/sending-email-trip-create-confirmation';
import { NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { SendingEmailTripInvite } from '@domain/usecases/email/sending-email-trip-invite';

export class CreateTripUseCase {
    constructor(
        private tripRepository: TripRepository,
        private participantValidator: Validator<ParticipantPropsCreate>,
        private tripValidator: Validator<TripPropsCreate>,
        private sendingEmailTripCreateConfirmation: SendingEmailTripCreate,
        private sendingEmailTripInvite: SendingEmailTripInvite
    ) {}

    async execute(
        data: CreateTripRequestProps
    ): Promise<
        Either<
            ValidationError<ParticipantProps>[] | ValidationError<TripPropsCreate>[] | NotFoundEntityError,
            TripResponseProps
        >
    > {
        const tripResult = TripMapper.toDomainWithValidation(data, this.participantValidator, this.tripValidator);

        if (tripResult.isError()) {
            return error(tripResult.value);
        }

        const trip = tripResult.value;

        const createdTrip = await this.tripRepository.create(trip);

        const sendEmailInfo = await this.sendingEmailTripCreateConfirmation.send(createdTrip);

        if (sendEmailInfo.isError()) {
            await this.tripRepository.delete(createdTrip.id);
            const { message } = sendEmailInfo.value;
            return error(new NotFoundEntityError(message, HttpStatus.INTERNAL_SERVER_ERROR));
        }

        const sendEmailInvitesInfo = await this.sendingEmailTripInvite.sendMany(createdTrip);

        if (sendEmailInvitesInfo.isError()) {
            const { message } = sendEmailInvitesInfo.value;
            return error(new NotFoundEntityError(message, HttpStatus.INTERNAL_SERVER_ERROR));
        }

        return success(TripMapper.toHttpResponse(createdTrip));
    }
}

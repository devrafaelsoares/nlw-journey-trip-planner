import { Either, error, success } from '@/helpers';
import { TripRepository } from '@domain/protocols/repositories';
import { ErrorMessages, ExistsEntityError, NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { ParticipantRepository } from '@domain/protocols/repositories';
import { Participant, ParticipantProps, ParticipantPropsCreate, Trip } from '@domain/entities';
import { ValidationError, Validator } from '@domain/validators/protocols';
import { TripMapper } from '@domain/mappers/trip';
import { TripResponseProps } from '@presentation/adpaters/trip';
import { SendingEmailTripInvite } from '@domain/usecases/email/sending-email-trip-invite';

export class SendTripInviteUseCase {
    constructor(
        private tripRepository: TripRepository,
        private participantRepository: ParticipantRepository,
        private validator: Validator<ParticipantPropsCreate>,
        private sendingEmailTripInvite: SendingEmailTripInvite
    ) {}
    async execute(
        tripId: string,
        guestEmail: string
    ): Promise<Either<NotFoundEntityError | ValidationError<ParticipantProps>[], TripResponseProps>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const foundParticipants = await this.participantRepository.find('email', guestEmail);

        if (foundParticipants) {
            return error(new ExistsEntityError(ErrorMessages.INVITATION_ALREADY_SENT_USER, HttpStatus.CONFLIT));
        }

        const participantResult = Participant.create({ email: guestEmail }, this.validator);

        if (participantResult.isError()) {
            return error(participantResult.value);
        }

        const participant = participantResult.value;

        await this.participantRepository.createAndTripConnect(participant, tripId);

        const sendEmailInfo = await this.sendingEmailTripInvite.send(foundTrip, participant);

        if (sendEmailInfo.isError()) {
            await this.participantRepository.delete(participant.id);
            const { message } = sendEmailInfo.value;
            return error(new NotFoundEntityError(message, HttpStatus.INTERNAL_SERVER_ERROR));
        }

        const foundUpdateTrip = (await this.tripRepository.findById(tripId)) as Trip;

        return success(TripMapper.toHttpResponse(foundUpdateTrip));
    }
}

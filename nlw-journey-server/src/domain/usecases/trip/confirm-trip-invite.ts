import { Either, error, success } from '@/helpers';
import { ErrorMessages, NotFoundEntityError, ParticipantConfirmedError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { ParticipantRepository, TripRepository } from '@domain/protocols/repositories';

export class ConfirmTripInviteUseCase {
    constructor(private tripRepository: TripRepository, private participantRepository: ParticipantRepository) {}
    async execute(
        tripId: string,
        participantId: string,
        participantName: string
    ): Promise<Either<NotFoundEntityError | ParticipantConfirmedError, undefined>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const foundParticipant = foundTrip.participants.find(participant => participant.id === participantId);

        if (!foundParticipant) {
            return error(new NotFoundEntityError(ErrorMessages.PARTICIPANT_NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        if (foundParticipant.isConfirmed) {
            return error(new ParticipantConfirmedError(ErrorMessages.CONFIRMED_PARTICIPANT, HttpStatus.CONFLIT));
        }

        foundParticipant.name = participantName;
        foundParticipant.confirm();

        await this.participantRepository.save(foundParticipant);

        return success(undefined);
    }
}

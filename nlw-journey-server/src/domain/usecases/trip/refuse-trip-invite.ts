import { ParticipantRepository, TripRepository } from '@domain/protocols/repositories';
import { Either, error, success } from '@/helpers';
import { NotFoundEntityError, ErrorMessages } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';

export class RefuseTripInviteUseCase {
    constructor(private tripRepository: TripRepository, private participantRepository: ParticipantRepository) {}

    async execute(tripId: string, participantId: string): Promise<Either<NotFoundEntityError, undefined>> {
        const foundTrip = await this.tripRepository.findById(tripId);

        if (!foundTrip) {
            return error(new NotFoundEntityError(ErrorMessages.NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        const foundParticipant = foundTrip.participants.find(participant => participant.id === participantId);

        if (!foundParticipant) {
            return error(new NotFoundEntityError(ErrorMessages.PARTICIPANT_NOT_FOUND_TRIP, HttpStatus.NOT_FOUND));
        }

        await this.participantRepository.delete(foundParticipant.id);

        return success(undefined);
    }
}

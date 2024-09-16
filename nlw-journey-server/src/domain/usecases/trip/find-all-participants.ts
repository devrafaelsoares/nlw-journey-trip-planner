import { ParticipantMapper } from '@domain/mappers/participant';
import { ParticipantRepository } from '@domain/protocols/repositories';
import { ParticipantResponseProps } from '@presentation/adpaters/participant';

export class FindAllParticipantsUseCase {
    constructor(private participantRepository: ParticipantRepository) {}
    async execute(tripId: string): Promise<ParticipantResponseProps[]> {
        const foundAllParticipantsByTrip = await this.participantRepository.findAllByTrip(tripId);
        return foundAllParticipantsByTrip.map(ParticipantMapper.toHttpResponse);
    }
}

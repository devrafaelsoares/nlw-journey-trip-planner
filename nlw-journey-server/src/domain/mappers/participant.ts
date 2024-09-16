import { Participant as PrismaParticipant } from '@prisma/client';
import { Participant } from '@domain/entities';
import { ParticipantResponseProps } from '@presentation/adpaters/participant';

export class ParticipantMapper {
    static toDomain(createdParticipant: PrismaParticipant): Participant {
        const { id, email, name } = createdParticipant;
        const participantResult = Participant.create(
            {
                name,
                email,
            },
            undefined,
            id
        );

        const participant = participantResult.value as Participant;

        return participant;
    }

    static toHttpResponse(trip: Participant): ParticipantResponseProps {
        const { id, name, email } = trip;
        return {
            id,
            name,
            email,
        };
    }
}

import { Participant, ParticipantProps } from '@domain/entities';
import { EntityRepository } from './entity-repository';

export interface ParticipantRepository extends EntityRepository<Participant, ParticipantProps> {
    createAndTripConnect(data: Participant, tripId: string): Promise<Participant>;
    findAllByTrip(tripId: string): Promise<Participant[]>;
}

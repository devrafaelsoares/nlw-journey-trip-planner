import { ParticipantRepository } from '@domain/protocols/repositories';
import { Participant, ParticipantProps } from '@domain/entities';

export class ParticipantInMemoryRepository implements ParticipantRepository {
    private readonly participants: Participant[] = [];
    private readonly tripParticipants: Map<string, string[]> = new Map(); // Map de tripId para uma lista de participantIds

    async createAndTripConnect(data: Participant, tripId: string): Promise<Participant> {
        this.participants.push(data);

        if (!this.tripParticipants.has(tripId)) {
            this.tripParticipants.set(tripId, []);
        }
        this.tripParticipants.get(tripId)!.push(data.id);

        return data;
    }
    async findAllByTrip(tripId: string): Promise<Participant[]> {
        const participantIds = this.tripParticipants.get(tripId) || [];
        return this.participants.filter(participant => participantIds.includes(participant.id));
    }

    async save(participant: Participant): Promise<Participant | void> {
        const tripFoundIndex = this.participants.findIndex(item => item.id === participant.id);

        if (tripFoundIndex >= 0) {
            this.participants[tripFoundIndex] = participant;
            return participant;
        }
    }

    async create(participant: Participant): Promise<Participant> {
        this.participants.push(participant);
        return participant;
    }

    async findById(id: string): Promise<Participant | null> {
        const foundParticipant = this.participants.find(participant => participant.id === id);

        if (!foundParticipant) {
            return null;
        }

        return foundParticipant;
    }

    async find<K extends keyof ParticipantProps>(field: K, value: ParticipantProps[K]): Promise<Participant[] | null> {
        const foundParticipants = this.participants.filter(participant => participant[field] === value);

        if (!foundParticipants.length) {
            return null;
        }

        return foundParticipants;
    }

    async findAll(): Promise<Participant[]> {
        return this.participants;
    }

    async delete(id: string): Promise<void> {
        const tripFoundIndex = this.participants.findIndex(item => item.id === id);

        if (tripFoundIndex >= 0) {
            this.participants.slice(tripFoundIndex);
        }
    }
}

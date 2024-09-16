import { ParticipantRepository } from '@domain/protocols/repositories';
import { Participant, ParticipantProps } from '@domain/entities';
import { prisma } from '@infra/database/prisma/config';
import { ParticipantMapper } from '@domain/mappers/participant';

export class ParticipantPrismaRepository implements ParticipantRepository {
    async create(data: Participant): Promise<Participant> {
        throw new Error('Method not implemented.');
    }

    async save(data: Participant): Promise<Participant | void> {
        const { id, name, email, isConfirmed } = data;

        const updatedParticipant = await prisma.participant.update({
            where: { id },
            data: {
                name,
                email,
                is_confirmed: isConfirmed,
            },
        });

        const participant = ParticipantMapper.toDomain(updatedParticipant);

        return participant;
    }

    async createAndTripConnect(data: Participant, tripId: string): Promise<Participant> {
        const createdParticipant = await prisma.participant.create({
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                trip: { connect: { id: tripId } },
            },
        });

        return ParticipantMapper.toDomain(createdParticipant);
    }

    async findById(id: string): Promise<Participant | null> {
        const foundParticipant = await prisma.participant.findUnique({ where: { id } });

        if (!foundParticipant) {
            return null;
        }

        return ParticipantMapper.toDomain(foundParticipant);
    }
    async find<K extends keyof ParticipantProps>(field: K, value: ParticipantProps[K]): Promise<Participant[] | null> {
        const foundParticipants = await prisma.participant.findMany({
            where: { [field]: value },
        });

        if (!foundParticipants.length) {
            return null;
        }

        const participants = foundParticipants.map(ParticipantMapper.toDomain);

        return participants;
    }
    async findAll(): Promise<Participant[]> {
        const foundAllParticipants = await prisma.participant.findMany();

        const participants = foundAllParticipants.map(ParticipantMapper.toDomain);

        return participants;
    }

    async findAllByTrip(tripId: string): Promise<Participant[]> {
        const foundAllParticipants = await prisma.participant.findMany({
            where: { trip_id: tripId },
        });

        const participants = foundAllParticipants.map(ParticipantMapper.toDomain);

        return participants;
    }

    async delete(id: string): Promise<void> {
        await prisma.participant.delete({ where: { id } });
    }
}

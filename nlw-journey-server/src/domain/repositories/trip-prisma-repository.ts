import { prisma } from '@infra/database/prisma/config';
import { Trip, TripProps } from '@domain/entities';
import { TripRepository } from '@domain/protocols/repositories';
import { TripMapper } from '@domain/mappers/trip';
import { Participant } from '@prisma/client';

export class TripPrismaRepository implements TripRepository {
    async save(data: Trip): Promise<Trip | void> {
        const { destination, startsAt, endsAt, isConfirmed } = data;

        const updatedTrip = await prisma.trip.update({
            where: { id: data.id },
            data: {
                destination,
                starts_at: startsAt,
                ends_at: endsAt,
                is_confirmed: isConfirmed,
            },
            include: { participants: true, activities: true, links: true },
        });

        const tripResult = TripMapper.toDomain(updatedTrip);

        const trip = tripResult.value as Trip;

        return trip;
    }

    async create(data: Trip): Promise<Trip> {
        const { destination, startsAt, endsAt, owner, participants } = data;

        const ownerParticipant = { name: owner.name, email: owner.email, is_confirmed: true, is_owner: true };

        const participantsEmail = participants.length
            ? [...participants.map(({ email }) => ({ email })), ownerParticipant]
            : [ownerParticipant];

        const createdTrip = await prisma.trip.create({
            data: {
                destination,
                starts_at: startsAt,
                ends_at: endsAt,
                participants: {
                    createMany: {
                        data: [...participantsEmail],
                    },
                },
            },
            include: { participants: true, activities: true, links: true },
        });

        const tripResult = TripMapper.toDomain(createdTrip);

        const trip = tripResult.value as Trip;

        return trip;
    }
    async findById(id: string): Promise<Trip | null> {
        const foundTrip = await prisma.trip.findUnique({
            where: { id },
            include: { participants: true, activities: true, links: true },
        });

        if (!foundTrip) {
            return null;
        }

        const tripResult = TripMapper.toDomain(foundTrip);

        const trip = tripResult.value as Trip;

        return trip;
    }
    async find<K extends keyof TripProps>(field: K, value: TripProps[K]): Promise<Trip[] | null> {
        const foundTrips = await prisma.trip.findMany({
            where: { [field]: value },
            include: { participants: true, activities: true, links: true },
        });

        if (!foundTrips.length) {
            return null;
        }

        const tripsResult = foundTrips.map(TripMapper.toDomain);

        const trips = tripsResult.map(trip => trip.value as Trip);

        return trips;
    }
    async findAll(): Promise<Trip[]> {
        const foundAllTrips = await prisma.trip.findMany({
            include: { participants: true, activities: true, links: true },
        });

        const tripsResult = foundAllTrips.map(TripMapper.toDomain);

        const trips = tripsResult.map(trip => trip.value as Trip);

        return trips;
    }
    async delete(id: string): Promise<void> {
        await prisma.trip.delete({ where: { id } });
    }
}

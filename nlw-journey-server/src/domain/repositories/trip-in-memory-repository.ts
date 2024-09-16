import { TripRepository } from '@domain/protocols/repositories';
import { Trip, TripProps } from '@domain/entities';

export class TripInMemoryRepository implements TripRepository {
    private readonly trips: Trip[] = [];

    async save(trip: Trip): Promise<Trip | void> {
        const tripFoundIndex = this.trips.findIndex(item => item.id === trip.id);

        if (tripFoundIndex >= 0) {
            this.trips[tripFoundIndex] = trip;
            return trip;
        }
    }

    async create(trip: Trip): Promise<Trip> {
        this.trips.push(trip);
        return trip;
    }

    async findById(id: string): Promise<Trip | null> {
        const foundTrip = this.trips.find(trip => trip.id === id);

        if (!foundTrip) {
            return null;
        }

        return foundTrip;
    }

    async find<K extends keyof TripProps>(field: K, value: TripProps[K]): Promise<Trip[] | null> {
        const foundTrips = this.trips.filter(trip => trip[field] === value);

        if (!foundTrips.length) {
            return null;
        }

        return foundTrips;
    }

    async findAll(): Promise<Trip[]> {
        return this.trips;
    }

    async delete(id: string): Promise<void> {
        const tripFoundIndex = this.trips.findIndex(item => item.id === id);

        if (tripFoundIndex >= 0) {
            this.trips.slice(tripFoundIndex);
        }
    }
}

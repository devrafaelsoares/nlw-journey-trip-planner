import { createTrip } from '@domain/factories/trip';
import { TripInMemoryRepository } from './trip-in-memory-repository';
import { Trip } from '@domain/entities';

describe('TripInMemoryRepository', () => {
    it('should be able to save an trip', async () => {
        const tripInMemoryRepository = new TripInMemoryRepository();

        const trip = createTrip() as Trip;

        const savedTrip = await tripInMemoryRepository.create(trip);
        const foundTrips = await tripInMemoryRepository.findAll();

        expect(foundTrips).toHaveLength(1);
        expect(foundTrips[0]).toEqual(savedTrip);
    });

    it('should be able to search all trips', async () => {
        const tripInMemoryRepository = new TripInMemoryRepository();

        const trip1 = createTrip({ destination: 'Dallas - EUA' }) as Trip;
        const trip2 = createTrip({ destination: 'Cancún - MEX' }) as Trip;
        const trip3 = createTrip({ destination: 'Tokyo - JP' }) as Trip;

        await tripInMemoryRepository.create(trip1);
        await tripInMemoryRepository.create(trip2);
        await tripInMemoryRepository.create(trip3);

        const foundTrips = await tripInMemoryRepository.findAll();

        expect(foundTrips).toHaveLength(3);
    });

    it('should be able to search trip by id', async () => {
        const tripInMemoryRepository = new TripInMemoryRepository();

        const trip = createTrip({ destination: 'Birmingham - UK' }) as Trip;

        const savedTrip = await tripInMemoryRepository.create(trip);

        const id = savedTrip.id;

        const foundTrip = await tripInMemoryRepository.findById(id);

        expect(foundTrip).not.toBeNull();
        expect(foundTrip).toBe(savedTrip);
    });

    it('should be able to search trip by some attribute', async () => {
        const tripInMemoryRepository = new TripInMemoryRepository();

        const trip = createTrip({ destination: 'Destino 01' }) as Trip;

        const savedTrip = await tripInMemoryRepository.create(trip);

        const foundTrip = await tripInMemoryRepository.find('destination', 'Destino 01');

        expect(foundTrip).not.toBeNull();
        expect(foundTrip).toContainEqual(savedTrip);
    });

    it('should be able to update an event', async () => {
        const tripInMemoryRepository = new TripInMemoryRepository();

        const trip = createTrip({ destination: 'Destino 01' }) as Trip;

        const savedTrip = await tripInMemoryRepository.create(trip);

        savedTrip.destination = 'Destino 01 (Alterado)';

        const savedUpdatedTrip = await tripInMemoryRepository.save(savedTrip);

        expect(savedUpdatedTrip).toHaveProperty('destination', 'Destino 01 (Alterado)');
    });

    it('should be able to delete an event', async () => {
        const tripInMemoryRepository = new TripInMemoryRepository();

        const event = createTrip({ destination: 'Destino 01' }) as Trip;

        const savedTrip = await tripInMemoryRepository.create(event);

        await tripInMemoryRepository.delete(savedTrip.id);

        const foundTrips = await tripInMemoryRepository.findAll();

        expect(foundTrips).not.toContain([]);
    });
});

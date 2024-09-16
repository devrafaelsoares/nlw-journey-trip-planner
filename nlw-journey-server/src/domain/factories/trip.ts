import { Participant, Trip, TripPropsCreate } from '@domain/entities';
import { TripValidatorSimple } from '@domain/validators/trip-validator-simple';
import { ValidationError } from '@domain/validators/protocols';
import { createParticipant } from './participant';

export function createTripProps(overrides: Partial<TripPropsCreate> = {}): TripPropsCreate {
    const owner = createParticipant() as Participant;

    const today = new Date();
    const startsAt = new Date(today);
    const endsAt = new Date(today);

    startsAt.setDate(today.getDate() + 5);
    endsAt.setDate(today.getDate() + 15);

    return {
        destination: 'Los Angeles - CA',
        startsAt,
        endsAt,
        owner,
        ...overrides,
    };
}

export function createTrip(overrides: Partial<TripPropsCreate> = {}): Trip | ValidationError<TripPropsCreate>[] {
    const eventValidator = new TripValidatorSimple();
    const eventPropsCreate = createTripProps(overrides);
    const eventResult = Trip.create(eventPropsCreate, eventValidator);
    return eventResult.value;
}

import { ParticipantValidatorSimple, TripValidatorSimple } from '@domain/validators';
import { Trip, TripProps, TripPropsCreate } from './trip';
import { ParticipantPropsCreate, Participant } from './participant';

describe('Trip', () => {
    it('should be able to create a trip', () => {
        const ownerParticipantProps: ParticipantPropsCreate = {
            name: 'Owner',
            email: 'owner@email.com',
        };
        const participantValidator = new ParticipantValidatorSimple();
        const ownerParticipantResult = Participant.create(ownerParticipantProps, participantValidator);
        const ownerParticipant = ownerParticipantResult.value as Participant;

        ownerParticipant.confirm();

        const tripProps: TripPropsCreate = {
            destination: 'São Paulo - SP',
            startsAt: new Date('2024-11-15'),
            endsAt: new Date('2024-11-17'),
            owner: ownerParticipant,
        };

        const tripValidator = new TripValidatorSimple();

        const tripResult = Trip.create(tripProps, tripValidator);

        expect(tripResult.isSuccess()).toBeTruthy();
        expect(tripResult.value).toStrictEqual(expect.any(Trip));
    });

    it('should not be possible to create a trip', () => {
        const ownerParticipantProps: ParticipantPropsCreate = {
            name: 'Owner',
            email: 'owner@email.com',
        };
        const participantValidator = new ParticipantValidatorSimple();
        const ownerParticipantResult = Participant.create(ownerParticipantProps, participantValidator);
        const ownerParticipant = ownerParticipantResult.value as Participant;

        ownerParticipant.confirm();

        const tripProps: TripPropsCreate = {
            destination: '',
            startsAt: new Date('2024-11-15'),
            endsAt: new Date('2024-11-17'),
            owner: ownerParticipant,
        };

        const tripValidator = new TripValidatorSimple();

        const tripResult = Trip.create(tripProps, tripValidator);

        expect(tripResult.isError()).toBeTruthy();
        expect(tripResult.value).toEqual([{ path: 'destination', message: 'O destino da viagem é obrigatório' }]);
    });
});

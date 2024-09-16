import { Participant, ParticipantPropsCreate, Trip, TripPropsCreate } from '@domain/entities';
import { TripValidatorSimple } from './trip-validator-simple';
import { ParticipantValidatorSimple } from './participant-validator-simple';

describe('TripValidator', () => {
    it('should return an error if destination is empty', () => {
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

        const tripValidatorResult = tripValidator.validate(tripProps);

        expect(tripValidatorResult).toEqual([{ path: 'destination', message: 'O destino da viagem é obrigatório' }]);
    });

    it('should return an error if the trip start date is before the trip registration time', () => {
        const ownerParticipantProps: ParticipantPropsCreate = {
            name: 'Owner',
            email: 'owner@email.com',
        };
        const participantValidator = new ParticipantValidatorSimple();
        const ownerParticipantResult = Participant.create(ownerParticipantProps, participantValidator);
        const ownerParticipant = ownerParticipantResult.value as Participant;

        ownerParticipant.confirm();

        const tripProps: TripPropsCreate = {
            destination: 'Trip 1',
            startsAt: new Date('2024-02-15'),
            endsAt: new Date('2024-11-18'),
            owner: ownerParticipant,
        };

        const tripValidator = new TripValidatorSimple();

        const tripValidatorResult = tripValidator.validate(tripProps);

        expect(tripValidatorResult).toEqual([{ path: 'startsAt', message: 'Data informada inválida' }]);
    });
});

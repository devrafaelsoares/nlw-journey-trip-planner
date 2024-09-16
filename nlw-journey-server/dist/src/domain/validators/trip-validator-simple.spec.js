"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entities_1 = require("../entities");
var trip_validator_simple_1 = require("./trip-validator-simple");
var participant_validator_simple_1 = require("./participant-validator-simple");
describe('TripValidator', function () {
    it('should return an error if destination is empty', function () {
        var ownerParticipantProps = {
            name: 'Owner',
            email: 'owner@email.com',
        };
        var participantValidator = new participant_validator_simple_1.ParticipantValidatorSimple();
        var ownerParticipantResult = entities_1.Participant.create(ownerParticipantProps, participantValidator);
        var ownerParticipant = ownerParticipantResult.value;
        ownerParticipant.confirm();
        var tripProps = {
            destination: '',
            startsAt: new Date('2024-11-15'),
            endsAt: new Date('2024-11-17'),
            owner: ownerParticipant,
        };
        var tripValidator = new trip_validator_simple_1.TripValidatorSimple();
        var tripValidatorResult = tripValidator.validate(tripProps);
        expect(tripValidatorResult).toEqual([{ path: 'destination', message: 'O destino da viagem é obrigatório' }]);
    });
    it('should return an error if the trip start date is before the trip registration time', function () {
        var ownerParticipantProps = {
            name: 'Owner',
            email: 'owner@email.com',
        };
        var participantValidator = new participant_validator_simple_1.ParticipantValidatorSimple();
        var ownerParticipantResult = entities_1.Participant.create(ownerParticipantProps, participantValidator);
        var ownerParticipant = ownerParticipantResult.value;
        ownerParticipant.confirm();
        var tripProps = {
            destination: 'Trip 1',
            startsAt: new Date('2024-02-15'),
            endsAt: new Date('2024-11-18'),
            owner: ownerParticipant,
        };
        var tripValidator = new trip_validator_simple_1.TripValidatorSimple();
        var tripValidatorResult = tripValidator.validate(tripProps);
        expect(tripValidatorResult).toEqual([{ path: 'startsAt', message: 'Data informada inválida' }]);
    });
});

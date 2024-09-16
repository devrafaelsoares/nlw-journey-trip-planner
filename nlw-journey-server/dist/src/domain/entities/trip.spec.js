"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../validators");
var trip_1 = require("./trip");
var participant_1 = require("./participant");
describe('Trip', function () {
    it('should be able to create a trip', function () {
        var ownerParticipantProps = {
            name: 'Owner',
            email: 'owner@email.com',
        };
        var participantValidator = new validators_1.ParticipantValidatorSimple();
        var ownerParticipantResult = participant_1.Participant.create(ownerParticipantProps, participantValidator);
        var ownerParticipant = ownerParticipantResult.value;
        ownerParticipant.confirm();
        var tripProps = {
            destination: 'São Paulo - SP',
            startsAt: new Date('2024-11-15'),
            endsAt: new Date('2024-11-17'),
            owner: ownerParticipant,
        };
        var tripValidator = new validators_1.TripValidatorSimple();
        var tripResult = trip_1.Trip.create(tripProps, tripValidator);
        expect(tripResult.isSuccess()).toBeTruthy();
        expect(tripResult.value).toStrictEqual(expect.any(trip_1.Trip));
    });
    it('should not be possible to create a trip', function () {
        var ownerParticipantProps = {
            name: 'Owner',
            email: 'owner@email.com',
        };
        var participantValidator = new validators_1.ParticipantValidatorSimple();
        var ownerParticipantResult = participant_1.Participant.create(ownerParticipantProps, participantValidator);
        var ownerParticipant = ownerParticipantResult.value;
        ownerParticipant.confirm();
        var tripProps = {
            destination: '',
            startsAt: new Date('2024-11-15'),
            endsAt: new Date('2024-11-17'),
            owner: ownerParticipant,
        };
        var tripValidator = new validators_1.TripValidatorSimple();
        var tripResult = trip_1.Trip.create(tripProps, tripValidator);
        expect(tripResult.isError()).toBeTruthy();
        expect(tripResult.value).toEqual([{ path: 'destination', message: 'O destino da viagem é obrigatório' }]);
    });
});

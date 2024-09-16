"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../validators");
var participant_1 = require("./participant");
describe('Participant', function () {
    it('should be able to create a participant', function () {
        var participantValidator = new validators_1.ParticipantValidatorSimple();
        var participantProps = {
            email: 'anyon@eemail.com',
            name: 'Anyone',
        };
        var participantResult = participant_1.Participant.create(participantProps, participantValidator);
        expect(participantResult.isSuccess()).toBeTruthy();
        expect(participantResult.value).toStrictEqual(expect.any(participant_1.Participant));
    });
    it('should not be possible to create a participant', function () {
        var participantValidator = new validators_1.ParticipantValidatorSimple();
        var participantProps = {
            email: '',
            name: 'Anyone',
        };
        var participantResult = participant_1.Participant.create(participantProps, participantValidator);
        expect(participantResult.isError()).toBeTruthy();
        expect(participantResult.value).toEqual([{ path: 'email', message: 'O email é obrigatório' }]);
    });
});

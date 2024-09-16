"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var participant_validator_simple_1 = require("./participant-validator-simple");
describe('ParticipantValidator', function () {
    it('should return an error if email is empty', function () {
        var participantProps = {
            email: '',
            name: 'Anyone',
        };
        var participantValidator = new participant_validator_simple_1.ParticipantValidatorSimple();
        var participantValidationResult = participantValidator.validate(participantProps);
        expect(participantValidationResult).toEqual([{ path: 'email', message: 'O email é obrigatório' }]);
    });
    it('should return an error if email format is invalid', function () {
        var participantProps = {
            email: 'anyoneemail.com',
            name: 'Anyone',
        };
        var participantValidator = new participant_validator_simple_1.ParticipantValidatorSimple();
        var participantValidationResult = participantValidator.validate(participantProps);
        expect(participantValidationResult).toEqual([{ path: 'email', message: 'Email inválido' }]);
    });
});

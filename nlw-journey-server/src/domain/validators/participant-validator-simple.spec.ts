import { ParticipantProps } from '@domain/entities';
import { ParticipantValidatorSimple } from './participant-validator-simple';

describe('ParticipantValidator', () => {
    it('should return an error if email is empty', () => {
        const participantProps: ParticipantProps = {
            email: '',
            name: 'Anyone',
        };

        const participantValidator = new ParticipantValidatorSimple();

        const participantValidationResult = participantValidator.validate(participantProps);
        expect(participantValidationResult).toEqual([{ path: 'email', message: 'O email é obrigatório' }]);
    });

    it('should return an error if email format is invalid', () => {
        const participantProps: ParticipantProps = {
            email: 'anyoneemail.com',
            name: 'Anyone',
        };

        const participantValidator = new ParticipantValidatorSimple();

        const participantValidationResult = participantValidator.validate(participantProps);
        expect(participantValidationResult).toEqual([{ path: 'email', message: 'Email inválido' }]);
    });
});

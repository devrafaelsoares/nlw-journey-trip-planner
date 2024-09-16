import { ParticipantValidatorSimple } from '@domain/validators';
import { Participant, ParticipantProps } from './participant';

describe('Participant', () => {
    it('should be able to create a participant', () => {
        const participantValidator = new ParticipantValidatorSimple();
        const participantProps: ParticipantProps = {
            email: 'anyon@eemail.com',
            name: 'Anyone',
        };

        const participantResult = Participant.create(participantProps, participantValidator);

        expect(participantResult.isSuccess()).toBeTruthy();
        expect(participantResult.value).toStrictEqual(expect.any(Participant));
    });

    it('should not be possible to create a participant', () => {
        const participantValidator = new ParticipantValidatorSimple();
        const participantProps: ParticipantProps = {
            email: '',
            name: 'Anyone',
        };
        const participantResult = Participant.create(participantProps, participantValidator);

        expect(participantResult.isError()).toBeTruthy();
        expect(participantResult.value).toEqual([{ path: 'email', message: 'O email é obrigatório' }]);
    });
});

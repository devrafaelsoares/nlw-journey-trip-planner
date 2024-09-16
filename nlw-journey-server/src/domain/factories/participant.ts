import { Participant, ParticipantPropsCreate } from '@domain/entities';
import { ParticipantValidatorSimple } from '@domain/validators/participant-validator-simple';
import { ValidationError } from '@domain/validators/protocols';

export function createParticipantProps(overrides: Partial<ParticipantPropsCreate> = {}): ParticipantPropsCreate {
    return {
        name: 'Anyone',
        email: 'anyone@email.com',
        ...overrides,
    };
}

export function createParticipant(
    overrides: Partial<ParticipantPropsCreate> = {}
): Participant | ValidationError<ParticipantPropsCreate>[] {
    const eventValidator = new ParticipantValidatorSimple();
    const eventPropsCreate = createParticipantProps(overrides);
    const eventResult = Participant.create(eventPropsCreate, eventValidator);
    return eventResult.value;
}

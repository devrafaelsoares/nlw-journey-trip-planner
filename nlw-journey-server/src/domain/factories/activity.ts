import { Activity, ActivityPropsCreate } from '@domain/entities';
import { ActivityValidatorSimple } from '@domain/validators';
import { ValidationError } from '@domain/validators/protocols';

export function createActivityProps(overrides: Partial<ActivityPropsCreate> = {}): ActivityPropsCreate {
    const today = new Date();
    const occursAt = new Date(today);

    occursAt.setDate(today.getDate() + 15);

    return {
        title: 'Teste',
        occursAt,
        ...overrides,
    };
}

export function createActivity(
    overrides: Partial<ActivityPropsCreate> = {}
): Activity | ValidationError<ActivityPropsCreate>[] {
    const eventValidator = new ActivityValidatorSimple();
    const eventPropsCreate = createActivityProps(overrides);
    const eventResult = Activity.create(eventPropsCreate, eventValidator);
    return eventResult.value;
}

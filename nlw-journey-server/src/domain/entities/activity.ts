import { randomUUID } from 'crypto';
import { Either, error, success } from '@helpers/either';
import { ValidationError, Validator } from '@domain/validators/protocols';

export type ActivityProps = {
    title: string;
    occursAt: Date;
};

export type ActivityPropsCreate = ActivityProps;

export class Activity implements ActivityProps {
    private _id: string;

    private constructor(private props: ActivityPropsCreate, id?: string) {
        this._id = id ? id : randomUUID();
    }

    public static create(
        props: ActivityPropsCreate,
        validator?: Validator<ActivityPropsCreate>,
        id?: string
    ): Either<ValidationError<ActivityPropsCreate>[], Activity> {
        if (validator) {
            const validationErrors: ValidationError<ActivityPropsCreate>[] = validator.validate(props);

            if (validationErrors.length > 0) {
                return error(validationErrors);
            }
        }

        return success(new Activity(props, id));
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this.props.title;
    }

    set title(title: string) {
        this.props.title = title;
    }

    get occursAt(): Date {
        return this.props.occursAt;
    }

    set occursAt(occursAt: Date) {
        this.props.occursAt = occursAt;
    }
}

import { randomUUID } from 'crypto';
import { Either, error, success } from '@helpers/either';
import { ValidationError, Validator } from '@domain/validators/protocols';

export type ParticipantProps = {
    name?: string | null;
    email: string;
};

export type ParticipantPropsCreate = ParticipantProps;

export class Participant implements ParticipantPropsCreate {
    private _id: string;
    private _isConfirmed: boolean;

    private constructor(private props: ParticipantPropsCreate, id?: string, isConfirmed?: boolean) {
        this._id = id ? id : randomUUID();
        this._isConfirmed = isConfirmed ? isConfirmed : false;
    }

    public static create(
        props: ParticipantPropsCreate,
        validator?: Validator<ParticipantPropsCreate>,
        id?: string,
        isConfirmed?: boolean
    ): Either<ValidationError<ParticipantPropsCreate>[], Participant> {
        if (validator) {
            const validationErrors: ValidationError<ParticipantPropsCreate>[] = validator.validate(props);

            if (validationErrors.length > 0) {
                return error(validationErrors);
            }
        }

        return success(new Participant(props, id, isConfirmed));
    }

    get id(): string {
        return this._id;
    }

    get name(): string | undefined | null {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get email(): string {
        return this.props.email;
    }

    set email(email: string) {
        this.props.email = email;
    }

    get isConfirmed(): boolean {
        return this._isConfirmed;
    }

    confirm(): void {
        this._isConfirmed = true;
    }
}

import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { Either, error, success } from '@helpers/either';
import { ValidationError, Validator } from '@domain/validators/protocols';
import { Participant } from './participant';
import { Activity } from './activity';
import { Link } from './link';
import { TripValidatorSimple } from '@domain/validators';

export type TripProps = {
    destination: string;
    startsAt: Date;
    endsAt: Date;
    participants: Participant[];
    activities: Activity[];
    links: Link[];
    owner: Participant;
    createdAt: Date;
};

export type TripPropsCreate = Replace<
    TripProps,
    {
        participants?: Participant[];
        activities?: Activity[];
        links?: Link[];
        createdAt?: Date;
    }
>;

export class Trip implements TripPropsCreate {
    private _id: string;
    private _isConfirmed: boolean;
    private props: TripProps;

    private constructor(props: TripPropsCreate, id?: string, isConfirmed?: boolean) {
        this._id = id ? id : randomUUID();
        this._isConfirmed = isConfirmed ? isConfirmed : false;
        this.props = {
            ...props,
            activities: props.activities ?? [],
            participants: props.participants ?? [],
            links: props.links ?? [],
            createdAt: props.createdAt ?? new Date(),
        };
    }

    static create(
        props: TripPropsCreate,
        validator?: Validator<TripPropsCreate>,
        id?: string,
        isConfirmed?: boolean
    ): Either<ValidationError<TripPropsCreate>[], Trip> {
        if (validator) {
            const validationErrors: ValidationError<TripPropsCreate>[] = validator.validate(props);

            if (validationErrors.length > 0) {
                return error(validationErrors);
            }
        }
        return success(new Trip(props, id, isConfirmed));
    }

    get id(): string {
        return this._id;
    }

    get destination(): string {
        return this.props.destination;
    }

    set destination(destination: string) {
        this.props.destination = destination;
    }

    get isConfirmed(): boolean {
        return this._isConfirmed;
    }

    confirm(): void {
        this._isConfirmed = true;
    }

    get startsAt(): Date {
        return this.props.startsAt;
    }

    set startsAt(startsAt: Date) {
        this.props.startsAt = startsAt;
    }

    get endsAt(): Date {
        return this.props.endsAt;
    }

    set endsAt(endsAt: Date) {
        this.props.endsAt = endsAt;
    }

    get participants(): Participant[] {
        return this.props.participants;
    }

    addParticipant(participant: Participant): void {
        this.participants.push(participant);
    }

    get activities(): Activity[] {
        return this.props.activities;
    }

    addActivity(activity: Activity): Either<ValidationError<TripPropsCreate>[], void> {
        const errors = TripValidatorSimple.validateActivities(activity, this.startsAt, this.endsAt);

        if (errors.length > 0) {
            return error(errors);
        }

        this.activities.push(activity);

        return success(undefined);
    }

    get links(): Link[] {
        return this.props.links;
    }

    addLinks(link: Link): Either<ValidationError<TripPropsCreate>[], void> {
        const errors = TripValidatorSimple.validateLinks(link);

        if (errors.length > 0) {
            return error(errors);
        }

        this.links.push(link);

        return success(undefined);
    }

    get owner(): Participant {
        return this.props.owner;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }
}

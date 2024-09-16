import { randomUUID } from 'crypto';
import { Either, error, success } from '@helpers/either';
import { ValidationError, Validator } from '@domain/validators/protocols';

export type LinkProps = {
    title: string;
    url: string;
};

export type LinkPropsCreate = LinkProps;

export class Link implements LinkProps {
    private _id: string;

    private constructor(private props: LinkPropsCreate, id?: string) {
        this._id = id ? id : randomUUID();
    }

    public static create(
        props: LinkPropsCreate,
        validator?: Validator<LinkPropsCreate>,
        id?: string
    ): Either<ValidationError<LinkPropsCreate>[], Link> {
        if (validator) {
            const validationErrors: ValidationError<LinkPropsCreate>[] = validator.validate(props);

            if (validationErrors.length > 0) {
                return error(validationErrors);
            }
        }

        return success(new Link(props, id));
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

    get url(): string {
        return this.props.url;
    }

    set url(url: string) {
        this.props.url = url;
    }
}

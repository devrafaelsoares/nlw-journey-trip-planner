import { ZodSchema } from 'zod';
import { ErrosValidator, Validator } from '@presentation/protocols';
import { Either, error, success } from '@/helpers';

export class ZodValidator<T> implements Validator<T> {
    constructor(private schema: ZodSchema<T>) {}

    validate(data: T): Either<Error | ErrosValidator, T> {
        const schemaResult = this.schema.safeParse(data);
        if (schemaResult.error) {
            const errorsZod = schemaResult.error.errors.map(({ path, message }) => ({ path: path[0], message }));
            return error(errorsZod);
        }
        return success(schemaResult.data);
    }
}

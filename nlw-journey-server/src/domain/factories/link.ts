import { Link, LinkPropsCreate } from '@domain/entities';
import { LinkValidatorSimple } from '@domain/validators';
import { ValidationError } from '@domain/validators/protocols';

export function createLinkProps(overrides: Partial<LinkPropsCreate> = {}): LinkPropsCreate {
    return {
        url: 'https://teste.com.br',
        title: 'Teste',
        ...overrides,
    };
}

export function createLink(overrides: Partial<LinkPropsCreate> = {}): Link | ValidationError<LinkPropsCreate>[] {
    const eventValidator = new LinkValidatorSimple();
    const eventPropsCreate = createLinkProps(overrides);
    const eventResult = Link.create(eventPropsCreate, eventValidator);
    return eventResult.value;
}

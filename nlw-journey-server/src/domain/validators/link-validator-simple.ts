import { LinkPropsCreate } from '@domain/entities';
import { ValidationError, Validator } from './protocols';

export class LinkValidatorSimple implements Validator<LinkPropsCreate> {
    private errors: ValidationError<LinkPropsCreate>[] = [];

    public validate(props: LinkPropsCreate): ValidationError<LinkPropsCreate>[] {
        this.cleanErrors();

        this.validateTitle(props.title);
        this.validateUrl(props.url);

        return this.errors;
    }

    private isEmpty(value: string): boolean {
        const valueSanatize = value.trim();
        return valueSanatize.length === 0;
    }

    private isUrlValid(value: string): boolean {
        return new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/gi).test(value);
    }

    private validateUrl(value: string): void {
        const rules = [{ validate: (val: string) => !this.isUrlValid(val), message: 'URL informada inválida' }];

        for (const rule of rules) {
            if (rule.validate(value)) {
                this.errors.push({ path: 'url', message: rule.message });
                break;
            }
        }
    }

    private validateTitle(value: string): void {
        const rules = [{ validate: (val: string) => this.isEmpty(val), message: 'O título do link é obrigatório' }];

        for (const rule of rules) {
            if (rule.validate(value)) {
                this.errors.push({ path: 'title', message: rule.message });
                break;
            }
        }
    }

    public cleanErrors(): void {
        this.errors = [];
    }
}

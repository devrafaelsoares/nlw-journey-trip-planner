import { ParticipantPropsCreate } from '@domain/entities';
import { ValidationError, Validator } from './protocols';

export class ParticipantValidatorSimple implements Validator<ParticipantPropsCreate> {
    private errors: ValidationError<ParticipantPropsCreate>[] = [];

    public validate(props: ParticipantPropsCreate): ValidationError<ParticipantPropsCreate>[] {
        this.cleanErrors();
        this.validateEmail(props.email);

        return this.errors;
    }

    private isEmpty(value: string): boolean {
        const valueSanatize = value.trim();
        return valueSanatize.length === 0;
    }

    private isEmailValid(value: string): boolean {
        return new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value);
    }

    private validateEmail(value: string): void {
        const rules = [
            { validate: (val: string) => this.isEmpty(val), message: 'O email é obrigatório' },
            { validate: (val: string) => !this.isEmailValid(val), message: 'Email inválido' },
        ];

        for (const rule of rules) {
            if (rule.validate(value)) {
                this.errors.push({ path: 'email', message: rule.message });
                break;
            }
        }
    }

    private validateName(value: string): void {
        const rules = [{ validate: (val: string) => this.isEmpty(val), message: 'O nome é obrigatório' }];

        for (const rule of rules) {
            if (rule.validate(value)) {
                this.errors.push({ path: 'name', message: rule.message });
                break;
            }
        }
    }

    public cleanErrors(): void {
        this.errors = [];
    }
}

import { ActivityPropsCreate } from '@domain/entities';
import { ValidationError, Validator } from './protocols';

export class ActivityValidatorSimple implements Validator<ActivityPropsCreate> {
    private errors: ValidationError<ActivityPropsCreate>[] = [];

    public validate(props: ActivityPropsCreate): ValidationError<ActivityPropsCreate>[] {
        this.cleanErrors();
        this.validateOccursAt(props.occursAt);
        this.validateTitle(props.title);

        return this.errors;
    }

    private isEmpty(value: string): boolean {
        const valueSanatize = value.trim();
        return valueSanatize.length === 0;
    }

    private isDateValid(value: Date): boolean {
        const currentDate = Date.now();
        return value.getTime() > currentDate;
    }

    private validateOccursAt(value: Date): void {
        const rules = [{ validate: (val: Date) => !this.isDateValid(val), message: 'Data informada inválida' }];

        for (const rule of rules) {
            if (rule.validate(value)) {
                this.errors.push({ path: 'occursAt', message: rule.message });
                break;
            }
        }
    }

    private validateTitle(value: string): void {
        const rules = [
            { validate: (val: string) => this.isEmpty(val), message: 'O título da atividade é obrigatório' },
        ];

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

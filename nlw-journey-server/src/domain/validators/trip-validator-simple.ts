import { Activity, Link, TripPropsCreate } from '@domain/entities';
import { ValidationError, Validator } from './protocols';

export class TripValidatorSimple implements Validator<TripPropsCreate> {
    private errors: ValidationError<TripPropsCreate>[] = [];

    public validate(props: TripPropsCreate): ValidationError<TripPropsCreate>[] {
        this.cleanErrors();
        this.validateDestination(props.destination);
        this.validateStatsAt(props.startsAt);
        this.validateEndsAt(props.startsAt, props.endsAt);

        return this.errors;
    }

    private static isEmpty(value: string): boolean {
        const valueSanatize = value.trim();
        return valueSanatize.length === 0;
    }

    private isDateValid(value: Date): boolean {
        const currentDate = Date.now();
        return value.getTime() > currentDate;
    }

    private static isUrlValid(value: string): boolean {
        return new RegExp(
            /\[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        ).test(value);
    }

    private isEndsDateValid(statsAtValue: Date, endsAtValue: Date): boolean {
        return endsAtValue.getTime() > statsAtValue.getTime();
    }

    private static isAcitivityDateValid(activity: Activity, statsAtValue: Date, endsAtValue: Date): boolean {
        return (
            activity.occursAt.getTime() >= statsAtValue.getTime() &&
            activity.occursAt.getTime() <= endsAtValue.getTime()
        );
    }

    private validateDestination(value: string): void {
        const rules = [
            {
                validate: (val: string) => TripValidatorSimple.isEmpty(val),
                message: 'O destino da viagem é obrigatório',
            },
        ];

        for (const rule of rules) {
            if (rule.validate(value)) {
                this.errors.push({ path: 'destination', message: rule.message });
                break;
            }
        }
    }

    private validateStatsAt(value: Date): void {
        const rules = [{ validate: (val: Date) => !this.isDateValid(val), message: 'Data informada inválida' }];

        for (const rule of rules) {
            if (rule.validate(value)) {
                this.errors.push({ path: 'startsAt', message: rule.message });
                break;
            }
        }
    }

    private validateEndsAt(statsAtValue: Date, endsAtValue: Date): void {
        const rules = [
            {
                validate: (statsAtVal: Date, endsAtVal: Date) => !this.isEndsDateValid(statsAtVal, endsAtVal),
                message: 'Data de início da viagem é posterior a data data de fim',
            },
        ];

        for (const rule of rules) {
            if (rule.validate(statsAtValue, endsAtValue)) {
                this.errors.push({ path: 'endsAt', message: rule.message });
                break;
            }
        }
    }

    public static validateActivities(
        value: Activity,
        statsAtValue: Date,
        endsAtValue: Date
    ): ValidationError<TripPropsCreate>[] {
        const activiesErrors: ValidationError<TripPropsCreate>[] = [];

        const rules = [
            {
                validate: (activity: Activity, statsAtVal: Date, endsAtVal: Date) =>
                    !this.isAcitivityDateValid(activity, statsAtVal, endsAtVal),
                message: 'A data da atividade não está no intervalo de tempo da viagem',
            },
        ];

        for (const rule of rules) {
            if (rule.validate(value, statsAtValue, endsAtValue)) {
                activiesErrors.push({ path: 'activities', message: rule.message });
                break;
            }
        }

        return activiesErrors;
    }

    public static validateLinks(value: Link): ValidationError<TripPropsCreate>[] {
        const linkErrors: ValidationError<TripPropsCreate>[] = [];

        const rules = [
            {
                validate: (link: Link) => this.isUrlValid(link.url),
                message: 'A url do link não é válida',
            },
            { validate: (link: Link) => TripValidatorSimple.isEmpty(link.title), message: 'A url é obrigatória' },
        ];

        for (const rule of rules) {
            if (rule.validate(value)) {
                linkErrors.push({ path: 'links', message: rule.message });
                break;
            }
        }

        return linkErrors;
    }

    public cleanErrors(): void {
        this.errors = [];
    }
}

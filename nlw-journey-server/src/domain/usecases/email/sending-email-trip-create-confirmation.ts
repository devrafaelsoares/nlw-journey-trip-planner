import { createFrontUrlBuilderDevelopment, Either, error, success } from '@/helpers';
import { NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { Email, Trip } from '@domain/entities';
import { tripCreateConfirmationTemplateHtml } from '@presentation/templates/email';
import { EmailService } from '@domain/protocols/email';

export class SendingEmailTripCreate {
    private readonly urlBuilder;

    constructor(private emailService: EmailService) {
        this.urlBuilder = createFrontUrlBuilderDevelopment();
    }

    async send(trip: Trip): Promise<Either<Error, void>> {
        const {
            destination,
            startsAt,
            endsAt,
            owner: { email },
        } = trip;

        const formattedDates = this.formatTripDates(startsAt, endsAt);

        const htmlContent = tripCreateConfirmationTemplateHtml
            .replace('[TRIP_DESTINATION]', destination)
            .replace('[TRIP_DATES]', formattedDates)
            .replace('[TRIP_CONFIRMATION_URL]', this.urlBuilder.buildTripConfirmationUrl(trip.id))
            .replace('[TRIP_REFUSE_URL]', this.urlBuilder.buildTripRefuseUrl(trip.id));

        const sendEmailInfo = await this.emailService.send(
            Email.create({
                from: 'rafael.soares.developer@gmail.com',
                to: email,
                subject: 'Confirmação da Criação da Sua Viagem',
                html: htmlContent,
            })
        );

        if (sendEmailInfo.isError()) {
            const { message } = sendEmailInfo.value;
            return error(new NotFoundEntityError(message, HttpStatus.INTERNAL_SERVER_ERROR));
        }

        return success(undefined);
    }

    private formatTripDates(startsAt: Date, endsAt: Date): string {
        const startDay = startsAt.getDate();
        const startMonth = startsAt.toLocaleString('pt-BR', { month: 'long' });
        const startYear = startsAt.getFullYear();

        const endDay = endsAt.getDate();
        const endMonth = endsAt.toLocaleString('pt-BR', { month: 'long' });
        const endYear = endsAt.getFullYear();

        if (startYear === endYear) {
            if (startMonth === endMonth) {
                return `${startDay} a ${endDay} de ${startMonth} de ${startYear}`;
            } else {
                return `${startDay} de ${startMonth} a ${endDay} de ${endMonth} de ${startYear}`;
            }
        } else {
            return `${startDay} de ${startMonth} de ${startYear} a ${endDay} de ${endMonth} de ${endYear}`;
        }
    }
}

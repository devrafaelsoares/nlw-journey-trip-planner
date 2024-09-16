import { createFrontUrlBuilderDevelopment, Either, error, success } from '@/helpers';
import { NotFoundEntityError } from '@presentation/errors';
import { HttpStatus } from '@presentation/protocols';
import { Email, Participant, Trip } from '@domain/entities';
import { tripInviteTemplateHtml } from '@presentation/templates/email';
import { EmailService } from '@domain/protocols/email';

export class SendingEmailTripInvite {
    private readonly urlBuilder;
    constructor(private emailService: EmailService) {
        this.urlBuilder = createFrontUrlBuilderDevelopment();
    }

    async send(trip: Trip, participant: Participant): Promise<Either<Error, void>> {
        const { destination, startsAt, endsAt } = trip;

        const formattedDates = this.formatTripDates(startsAt, endsAt);

        const htmlContent = tripInviteTemplateHtml
            .replace('[TRIP_DESTINATION]', destination)
            .replace('[TRIP_DATES]', formattedDates)
            .replace('[TRIP_OWNER]', trip.owner.name || trip.owner.email)
            .replace(
                '[TRIP_PRESENCE_CONFIRMATION_URL]',
                this.urlBuilder.buildTripParticipantConfirmationUrl(trip.id, participant.id)
            )
            .replace('[TRIP_INITE_REFUSE_URL]', this.urlBuilder.buildTripInviteRefuseUrl(trip.id, participant.id));

        const sendEmailInfo = await this.emailService.send(
            Email.create({
                from: 'rafael.soares.developer@gmail.com',
                to: participant.email,
                subject: 'Convite para Participar de uma Viagem',
                html: htmlContent,
            })
        );

        if (sendEmailInfo.isError()) {
            const { message } = sendEmailInfo.value;
            return error(new NotFoundEntityError(message, HttpStatus.INTERNAL_SERVER_ERROR));
        }

        return success(undefined);
    }

    async sendMany(trip: Trip): Promise<Either<Error, void>> {
        const { destination, startsAt, endsAt } = trip;

        const formattedDates = this.formatTripDates(startsAt, endsAt);

        const htmlContent = tripInviteTemplateHtml
            .replace('[TRIP_DESTINATION]', destination)
            .replace('[TRIP_DATES]', formattedDates)
            .replace('[TRIP_OWNER]', trip.owner.name || trip.owner.email);

        const participants = trip.participants.filter(participant => participant.isConfirmed === false);

        for (const participant of participants) {
            const htmlContentParticipant = htmlContent.replace(
                '[TRIP_PRESENCE_CONFIRMATION_URL]',
                this.urlBuilder.buildTripParticipantConfirmationUrl(trip.id, participant.id)
            );

            const sendEmailInfo = await this.emailService.send(
                Email.create({
                    from: 'rafael.soares.developer@gmail.com',
                    to: participant.email,
                    subject: 'Convite para Participar de uma Viagem',
                    html: htmlContentParticipant,
                })
            );

            if (sendEmailInfo.isError()) {
                const { message } = sendEmailInfo.value;
                return error(new NotFoundEntityError(message, HttpStatus.INTERNAL_SERVER_ERROR));
            }
        }

        return success(undefined);
    }

    private formatTripDates(startsAt: Date, endsAt: Date): string {
        const startDay = startsAt.getDate();
        const startMonth = startsAt.toLocaleString('default', { month: 'long' });
        const startYear = startsAt.getFullYear();

        const endDay = endsAt.getDate();
        const endMonth = endsAt.toLocaleString('default', { month: 'long' });
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

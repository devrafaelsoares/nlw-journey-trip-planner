import { Email } from '@domain/entities';
import { Either, error, success } from '@/helpers';
import { EmailService } from '@domain/protocols/email';
import { SMTPClient } from 'emailjs';

export class EmailJSService implements EmailService {
    private readonly client;
    constructor() {
        this.client = new SMTPClient({
            user: process.env.EMAIL_USERNAME,
            password: process.env.EMAIL_PASSWORD,
            host: process.env.EMAIL_HOST,
            ssl: true,
        });
    }
    async send(data: Email): Promise<Either<Error, Email | void>> {
        try {
            await this.client.sendAsync({
                from: data.from,
                to: data.to,
                subject: data.subject,
                text: data.text ? data.text : '',
                attachment: [{ data: data.html, alternative: true }],
            });

            return success(undefined);
        } catch (err: any) {
            console.error(err);
            return error(err);
        }
    }
}

import { Either, error, success } from '@/helpers';
import { Email } from '@domain/entities';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EmailService } from '@domain/protocols/email';

export class NodemailerService implements EmailService {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT as string),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async send(data: Email): Promise<Either<Error, Email | void>> {
        try {
            await this.transporter.sendMail({
                from: data.from,
                to: data.to,
                subject: data.subject,
                text: data.text,
                html: data.html,
                attachments: data.attachments,
            });

            return success(undefined);
        } catch (err: any) {
            console.error(err);
            return error(err);
        }
    }
}

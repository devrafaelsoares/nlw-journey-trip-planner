import { env } from 'process';
import { MY_IP_ADDRESS } from './network';

type Protocol = 'http' | 'https';

export class UrlBuilder {
    private readonly protocol: Protocol;
    private readonly host: string;
    private readonly port: number | string;

    constructor(protocol: Protocol = 'https', host: string, port?: number | string) {
        this.protocol = protocol;
        this.host = host;
        this.port = port || (this.protocol === 'http' ? 80 : 443);
    }

    buildUrl(paths: string[], params?: Record<string, string>): string {
        const path = paths.join('/');
        const url = new URL(`${this.protocol}://${this.host}:${this.port}/${path}`);

        if (params) {
            Object.keys(params).forEach(key => {
                url.searchParams.append(key, params[key]);
            });
        }

        return url.toString();
    }

    buildTripParticipantConfirmationUrl(tripId: string, participantId: string): string {
        return this.buildUrl(['trips', tripId, 'participants', participantId, 'confirm']);
    }

    buildTripConfirmationUrl(id: string): string {
        return this.buildUrl(['trips', id, 'confirm']);
    }

    buildTripInviteRefuseUrl(tripId: string, participantId: string): string {
        return this.buildUrl(['trips', tripId, 'participants', participantId, 'refuse']);
    }

    buildTripRefuseUrl(id: string): string {
        return this.buildUrl(['trips', id, 'refuse']);
    }
}

export const createServerUrlBuilderDevelopment = (): UrlBuilder => {
    return new UrlBuilder('http', MY_IP_ADDRESS, env.FASTIFY_PORT);
};

export const createFrontUrlBuilderDevelopment = (): UrlBuilder => {
    return new UrlBuilder('http', 'localhost');
};

export const createUrlBuilderProduction = (): UrlBuilder => {
    return new UrlBuilder('https', '');
};

import { ActivityResponseProps } from './activity';
import { baseUrl, fetchApi } from '@/api/config';
import action from '@/app/actions';
import { HttpResponse } from '@/app/helpers';

export type ParticipantResponseProps = {
    id?: string;
    name?: string | null;
    email: string;
    isConfirmed: boolean;
};

export type LinkResponseProps = {
    id: string;
    title: string;
    url: string;
};

export type TripResponseProps = {
    id: string;
    destination: string;
    starts_at: string;
    ends_at: string;
    owner: ParticipantResponseProps;
    activities: ActivityResponseProps[];
    links: LinkResponseProps[];
    participants: ParticipantResponseProps[];
    emails_to_invite: string[];
};

export type TripHttpResponse = HttpResponse<{ trip: TripResponseProps }>;

type TripParticipantConfirmationProps = {
    message: string;
};

type TripConfirmationHttpResponse = HttpResponse<TripParticipantConfirmationProps>;

type TripRefuseHttpResponse = HttpResponse<TripParticipantConfirmationProps>;

type CreateTripRequestProps = {
    destination: string;
    starts_at?: string;
    ends_at?: string;
    emails_to_invite?: string[];
    owner_name: string;
    owner_email: string;
};

type UpdateTripRequestProps = {
    destination: string;
    starts_at?: string;
    ends_at?: string;
};

export async function createTrip(data: CreateTripRequestProps): Promise<TripResponseProps> {
    const body = JSON.stringify(data);

    const response = await fetchApi<TripResponseProps>(`${baseUrl}/trips`, {
        method: 'POST',
        body,
    });

    return response;
}

export async function updateTrip(data: UpdateTripRequestProps, id: string): Promise<TripResponseProps> {
    const body = JSON.stringify(data);

    const response = await fetchApi<TripResponseProps>(`${baseUrl}/trips/${id}`, {
        method: 'PUT',
        body,
    });

    action();

    return response;
}

export async function findAllTrips(): Promise<HttpResponse<TripResponseProps[]>> {
    const response = await fetchApi<HttpResponse<TripResponseProps[]>>(`${baseUrl}/trips`, {
        next: { tags: ['trips'] },
    });

    return response;
}

export async function findByIdTrip(id: string): Promise<TripHttpResponse> {
    const response = await fetchApi<TripHttpResponse>(`${baseUrl}/trips/${id}`, {
        next: { tags: ['trip'] },
        cache: 'no-cache',
    });
    return response;
}

export async function confirmParticipant(id: string, participantId: string, participant_name: string) {
    const body = JSON.stringify({ participant_name });
    const response = await fetchApi<TripConfirmationHttpResponse>(
        `${baseUrl}/trips/${id}/participants/${participantId}/confirm`,
        {
            body,
            method: 'POST',
            next: { tags: ['trip'] },
            cache: 'no-cache',
        }
    );

    return response;
}

export async function confirmTrip(id: string) {
    const response = await fetchApi<TripConfirmationHttpResponse>(`${baseUrl}/trips/${id}/confirm`, {
        method: 'GET',
        next: { tags: ['trip'] },
        cache: 'no-cache',
    });

    return response;
}

export async function refuseTrip(id: string) {
    const response = await fetchApi<TripRefuseHttpResponse>(`${baseUrl}/trips/${id}/refuse`, {
        method: 'GET',
        next: { tags: ['trip'] },
        cache: 'no-cache',
    });

    return response;
}
